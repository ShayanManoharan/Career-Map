import React, { useState } from "react";

const GeminiAIExample: React.FC = () => {
  const [responseText, setResponseText] = useState<string>("");

  const fetchAIResponse = async () => {
    const apiKey = "AIzaSyBNqzlnt3FOSsXOCbiAAKxZx39LVhIUtmM"; // Replace with env var in prod!

    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

    const requestBody = {
      contents: [{ parts: [{ text: "Explain how AI works in a few words" }] }]
    };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    });

    const data = await res.json();
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    setResponseText(output);
  };

  return (
    <div>
      <button onClick={fetchAIResponse} className="bg-blue-500 text-white p-2 rounded">
        Ask AI
      </button>
      <p className="mt-4">{responseText}</p>
    </div>
  );
};

export default GeminiAIExample;
