import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);
    
    // This is the IMPROVED code
    useEffect(() => {
    const fetchHistory = async () => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');
        try {
            const res = await axios.get(`${API_URL}/chat/history`, {
                headers: { 'x-auth-token': token },
            });
            setMessages(res.data);
        } catch (err) {
            // Log the entire error object to see more details
            console.error('Failed to fetch chat history:', err); 
            // Also helpful to log the specific response from the server, if it exists
            if (err.response) {
                console.error('Server responded with:', err.response.data);
            }
        }
    };
    fetchHistory();
}, [navigate]);
    
const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input; // Save input before clearing it
    setInput('');
    setIsLoading(true);

    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
            `${API_URL}/chat/send`, 
            { message: currentInput }, // Use the saved input
            { headers: { 'x-auth-token': token } }
        );
        const aiMessage = { role: 'assistant', content: res.data.reply };
        setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
        // Log the detailed error to the browser console for debugging
        console.error("Error sending message:", err);
        
        // Provide a more helpful alert to the user
        if (err.response) {
            console.error("Server responded with:", err.response.data);
            alert(`Error: ${err.response.data.msg || 'The server encountered an error.'}`);
        } else {
            alert('Failed to send message. Check your network connection.');
        }

        //  Add the user's message back to the input box so they don't lose it
        setInput(currentInput); 
        // Remove the user's optimistic message from the chat history
        setMessages(prev => prev.slice(0, -1));

    } finally {
        setIsLoading(false);
    }
};

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="chat-container">
            <h1>AI Support Agent</h1>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>{msg.content}</div>
                ))}
                {isLoading && <div className="typing-indicator">Assistant is typing...</div>}
                <div ref={chatEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                />
                <button onClick={handleSend} disabled={isLoading}>Send</button>
            </div>
        </div>
    );
};

export default Chat;