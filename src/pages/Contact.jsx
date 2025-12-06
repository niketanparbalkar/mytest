import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { apiFetch } from '../auth/api';


export default function Contact() {
const { accessToken, setAccessToken } = useAuth();
const [secret, setSecret] = useState(null);
const [input, setInput] = useState("");
const [response, setResponse] = useState("");
const [prompt, setPrompt] = useState('');
const [loading, setLoading] = useState(false);

const URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=";
const payload={
    "contents":[{
        "parts":[{"text":input}]
    }]
};
const askGemini = async () => {
    console.log(input);
    const res = await fetch(URL+"AIzaSyAKS2wWXfUF3kDqVcaPP594aIPge2tbkaY", {
      method: "POST",
      //headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log(data.candidates[0].content.parts[0].text);
    setResponse(data.candidates[0].content.parts[0].text);
  };

useEffect(() => {
let mounted = true;
const fetchSecret = async () => {
const res = await apiFetch('/api/protected', { method: 'GET' }, () => accessToken, (t) => setAccessToken(t));
if (res.ok) {
const data = await res.json();
if (mounted) setSecret(JSON.stringify(data));
} else {
setSecret('Failed to load protected resource');
}
};
fetchSecret();
return () => { mounted = false; };
}, [accessToken, setAccessToken]);


const callGemini = async () => {
    setLoading(true);
    setResponse('');

    const apiKey = 'AIzaSyAKS2wWXfUF3kDqVcaPP594aIPge2tbkaY';

    try {
      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' +
          apiKey,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      setResponse(text);
    } catch (err) {
      setResponse('Error: ' + err.message);
    }

    setLoading(false);
  };

return (
<>
<h1>This is Contact page</h1>
 <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Simple AI App (React + Gemini)</h2>

      <textarea
        rows="4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
        style={{ width: '100%', padding: '10px' }}
      />

      <button
        onClick={callGemini}
        disabled={loading}
        style={{ marginTop: '10px' }}
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>

      {response && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
          <strong>Response:</strong>
          <p>{prompt}</p>
          <p>{response}</p>
        </div>
      )}
    </div>
</>
);
}