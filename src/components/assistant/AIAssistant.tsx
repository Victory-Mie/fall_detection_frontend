import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Input, List, Typography, Avatar } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";

const AIAssistant = () => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content: "Hello! I'm your AI assistant. How can I help you?",
    },
  ]);
  const messagesEndRef = useRef(null); // 创建 ref

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    setMessages((prev) => [...prev, { type: "user", content: inputValue }]);

    // 模拟AI回复
    const aiResponse = "This is a response from the AI.";
    setMessages((prev) => [...prev, { type: "ai", content: aiResponse }]);

    setInputValue("");
  };

  // 滚动到最新消息
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // 每次消息更新时执行

  return (
    <>
      {/* 右下角悬浮按钮 */}
      <Button
        shape="circle"
        icon={<UserOutlined />}
        size="large"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          fontSize: "24px",
        }}
        onClick={() => setVisible(true)}
      />

      {/* 对话框 */}
      <Modal
        title="AI Assistant"
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        width={400}
      >
        {/* 消息区域 - 固定高度 + 局部滚动 */}
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            marginBottom: "10px",
            padding: "8px",
            backgroundColor: "#fafafa",
            borderRadius: "6px",
          }}
        >
          <List
            dataSource={messages}
            renderItem={(item) => (
              <List.Item
                key={item.content}
                style={{
                  display: "flex",
                  justifyContent:
                    item.type === "user" ? "flex-end" : "flex-start",
                }}
              >
                {item.type === "ai" && (
                  <>
                    <Avatar size={32} icon={<RobotOutlined />} />
                    <Typography.Text
                      style={{
                        backgroundColor: "#fff7e6",
                        margin: "0 5px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        maxWidth: "70%",
                        wordBreak: "break-word",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        textAlign: "left",
                      }}
                    >
                      {item.content}
                    </Typography.Text>
                  </>
                )}
                {item.type === "user" && (
                  <>
                    <Typography.Text
                      style={{
                        backgroundColor: "#e6f7ff",
                        margin: "0 5px",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        maxWidth: "70%",
                        wordBreak: "break-word",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        textAlign: "right",
                      }}
                    >
                      {item.content}
                    </Typography.Text>
                    <Avatar size={32} icon={<UserOutlined />} />
                  </>
                )}
              </List.Item>
            )}
          />
          <div ref={messagesEndRef} /> {/* 滚动目标 */}
        </div>

        {/* 输入框与发送按钮 */}
        <Input.TextArea
          rows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSend}
          placeholder="Enter your question..."
        />
        <Button
          type="primary"
          onClick={handleSend}
          style={{ marginTop: "10px", width: "100%" }}
        >
          Send
        </Button>
      </Modal>
    </>
  );
};

export default AIAssistant;
