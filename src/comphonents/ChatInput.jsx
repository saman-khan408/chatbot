import LoadingSpinner from "../assets/loading-spinner.gif";
import { useState } from "react";
import dayjs from "dayjs";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }
  async function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img src={LoadingSpinner} alt="" className="loading-spinner" />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);
    const response = await Chatbot.getResponseAsync(inputText);
    setInputText("");
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
    if (event.key === "Escape") {
      setInputText("");
    }
  }
  function clearMessages() {
    setChatMessages([]);
  }
  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
      <button className="clear-button" onClick={clearMessages}>
        Clear
      </button>
    </div>
  );
}
