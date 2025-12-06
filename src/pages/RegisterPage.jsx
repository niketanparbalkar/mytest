import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function RegisterPage() {
const [userName, setUserName] = useState('');
const [email, setEmail] = useState('');
const [displayName, setDisplayName] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);
const navigate = useNavigate();


const handleSubmit = async (e) => {
e.preventDefault();
setError(null);
try {
const res = await fetch('https://localhost:7299/api/auth/register', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ userName, email, password, displayName })
});
if (!res.ok) {
const txt = await res.text();
setError(txt || 'Register failed');
return;
}
navigate('/login');
} catch (err) {
setError('Network error');
}
};


return (
<div className="max-w-md mx-auto bg-white p-6 rounded shadow">
<h2 className="text-xl font-semibold mb-4">Register</h2>
<form onSubmit={handleSubmit}>
<label className="block mb-2">Username</label>
<input value={userName} onChange={e => setUserName(e.target.value)} className="w-full p-2 mb-3 border rounded" />
<label className="block mb-2">Email</label>
<input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 mb-3 border rounded" />
<label className="block mb-2">Display Name</label>
<input value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full p-2 mb-3 border rounded" />
<label className="block mb-2">Password</label>
<input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full p-2 mb-4 border rounded" />
{error && <div className="text-red-600 mb-2">{error}</div>}
<button className="w-full p-2 bg-green-600 text-white rounded">Register</button>
</form>
</div>
);
}