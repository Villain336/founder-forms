import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const generateResponse = async () => {
    if (!input) return;
    
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // 1. TRY TO FIND THE KEY
      // This checks for different naming conventions (Vite, React, or Next)
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 
                     process.env.REACT_APP_GEMINI_API_KEY || 
                     process.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("Missing API Key. Add it to Vercel Settings.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      setMessages([...newMessages, { role: "ai", text: text }]);
    } catch (error: any) {
      console.error(error);
      setMessages([...newMessages, { role: "ai", text: "Error: " + error.message }]);
    }
    
    setLoading(false);
    setInput("");
  };

  return (
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh", padding: "20px", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ color: "#3b82f6", fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>My AI App</h1>
      
      {/* Chat Area */}
      <div style={{ width: "100%", maxWidth: "600px", backgroundColor: "#111827", borderRadius: "8px", padding: "16px", height: "60vh", overflowY: "auto", marginBottom: "16px", border: "1px solid #374151" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "16px", padding: "12px", borderRadius: "8px", backgroundColor: msg.role === "user" ? "#2563eb" : "#374151", marginLeft: msg.role === "user" ? "auto" : "0", maxWidth: "80%", width: "fit-content" }}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div style={{ color: "#9ca3af" }}>Thinking...</div>}
      </div>

      {/* Input Area */}
      <div style={{ width: "100%", maxWidth: "600px", display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
          style={{ flex: 1, padding: "12px", borderRadius: "4px", backgroundColor: "#1f2937", border: "1px solid #4b5563", color: "white" }}
          onKeyDown={(e) => e.key === "Enter" && generateResponse()}
        />
        <button 
          onClick={generateResponse}
          disabled={loading}
          style={{ backgroundColor: "#2563eb", padding: "12px 24px", borderRadius: "4px", fontWeight: "bold", border: "none", color: "white", cursor: "pointer" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
