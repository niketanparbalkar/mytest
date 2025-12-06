import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { apiFetch } from '../auth/api';


export default function About() {
const { accessToken, setAccessToken } = useAuth();
const [secret, setSecret] = useState(null);
const [dt, setdt] = useState(null);


useEffect(() => {
let mounted = true;
const fetchSecret = async () => {
const res = await apiFetch('https://localhost:7299/api/Home/About', { method: 'GET' }, () => accessToken, (t) => setAccessToken(t));
if (res.ok) {
const data = await res.json();
console.log(data);
if (mounted) setSecret(JSON.stringify(data));
} else {
setSecret('Failed to load protected resource');
}
};
fetchSecret();
return () => { mounted = false; };
}, [accessToken, setAccessToken]);


return (
<>
<h1>This is About page</h1>
<p></p>
</>
);
}