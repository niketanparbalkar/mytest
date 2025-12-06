import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { apiFetch } from '../auth/api';
import api1 from '../auth/api1';


export default function Profile() {

    const[user,setUsers]=useState('');

useEffect(() => {
  api1.get("Home/Profile")
     .then(res => setUsers(res.data))
     .catch(err => console.error(err));
}, []);



return (
<>
<h1>This is Profile page</h1>
<h1>{user}</h1>
</>
);
}