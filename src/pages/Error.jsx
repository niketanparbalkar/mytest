import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { apiFetch } from '../auth/api';


export default function Error() {
const { accessToken, setAccessToken } = useAuth();
const [secret, setSecret] = useState(null);




return (
<>
<h1>Opps something Wrong</h1>
</>
);
}