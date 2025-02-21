// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import "./ChatBot.css";

// const ChatBot = ({ onClose }) => {
//     const [messages, setMessages] = useState([
//         { text: "Hello! How can I assist you today?", sender: "bot" }
//     ]);
//     const [input, setInput] = useState("");

//     const generateComplaintID = () => {
//         return "CMP-" + Math.floor(1000 + Math.random() * 9000);
//     };

//     const handleSendMessage = () => {
//         if (!input.trim()) return;

//         const newComplaintID = generateComplaintID();
//         const userMessage = { text: input, sender: "user" };
//         const botResponse = { text: `Your complaint has been filed. Complaint ID: ${newComplaintID}`, sender: "bot" };

//         setMessages([...messages, userMessage, botResponse]);
//         setInput("");
//     };

//     return (
//         <div className="chatbot-container">
//             <div className="chat-header">
//                 <h3>Support Chat</h3>
//                 <button className="close-btn" onClick={onClose}>X</button>
//             </div>
//             <div className="chat-body">
//                 {messages.map((msg, index) => (
//                     <div key={index} className={`message ${msg.sender}`}>
//                         {msg.text}
//                     </div>
//                 ))}
//             </div>
//             <div className="chat-input">
//                 <input 
//                     type="text" 
//                     value={input} 
//                     onChange={(e) => setInput(e.target.value)} 
//                     placeholder="Describe your issue..."
//                 />
//                 <button onClick={handleSendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default ChatBot;



import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./ChatBot.css";

const ChatBot = ({ onComplaintGenerated }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const predefinedResponses = {
        "network issue": "Try restarting your router.",
        "password reset": "Go to settings and click 'Reset Password'.",
    };

    const handleSendMessage = () => {
        if (!input.trim()) return;
        
        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        
        setTimeout(() => {
            const responseText = predefinedResponses[input.toLowerCase()] || "I'm not sure. Submitting your issue as a complaint.";
            const botMessage = { sender: "bot", text: responseText };
            setMessages([...newMessages, botMessage]);

            if (responseText.includes("Submitting your issue")) {
                const complaintId = uuidv4();
                onComplaintGenerated(complaintId, input);
            }
        }, 1000);

        setInput("");
    };

    return (
        <div className="chatbot-container">
            <div className="chatbox">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Ask something..." 
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatBot;

