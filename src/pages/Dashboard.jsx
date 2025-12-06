import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { apiFetch } from '../auth/api';


export default function Dashboard() {
const { accessToken, setAccessToken } = useAuth();
const [secret, setSecret] = useState(null);


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


return (
<div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
<h2 className="text-xl font-semibold mb-4">Dashboard (Protected)</h2>
<div className="bg-gray-100 p-4 rounded">{secret ?? 'Loading...'}</div>
</div>
);
}