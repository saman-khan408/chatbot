import { useState,useEffect } from "react";
import { Chatbot } from "supersimpledev";
import { ChatInput } from "./comphonents/ChatInput";
import ChatMessages from "./comphonents/ChatMessages";
import { ChatMessage } from "./comphonents/ChatMessage";
import "./App.css";
import robotProfileImage from './assets/robot.png'

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  // const chatMessages = array[0];
  // const setChatMessage = array[1];
  useEffect(() => {
    Chatbot.addResponses({
      'goodbye':'Goodbye. Have a great day!',
      'give me a unique id':function(){
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`
      }
    })
  },[])
  useEffect(() => {
    localStorage.setItem('messages',JSON.stringify(chatMessages))
  },[chatMessages])
  
  const title = `${chatMessages.length} Messages`
  return (
    <>
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href={robotProfileImage} />
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="welcome-message">
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </p>
      )}

      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
      </>
  );
}

export default App;
