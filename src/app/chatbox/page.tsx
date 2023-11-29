"use client";

// pages/chatbox/page.tsx
import { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatboxPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Do something when the content changes
        }
      });
    });

    const chatbox = document.getElementById('chatbox'); // Assuming you have an element with id="chatbox"
    if (chatbox) {
      observer.observe(chatbox, { childList: true });
    }

    return () => observer.disconnect(); // Cleanup when the component is unmounted
  }, []); // Empty dependency array means this effect runs once after the initial render

  const sendMessage = async (message: string) => {
    try {
      const response = await fetch('/api/createMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: message }] }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message. HTTP status ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data.choices) && data.choices.length > 0) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: data.choices[0].text },
        ]);
      } else {
        console.error('Unexpected API response format:', data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div id="chatbox"> {/* Add an id to the container */}
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}</strong>: {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        onKeyDown={(e) => e.key === 'Enter' && sendMessage(e.currentTarget.value)}
      />
    </div>
  );
};

export default ChatboxPage;
