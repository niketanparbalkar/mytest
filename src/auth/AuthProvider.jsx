import React, { createContext, useContext, useEffect, useState } from 'react';


const AuthContext = createContext(null);


export function useAuth() {
return useContext(AuthContext);
}


// small helper to persist access token
const ACCESS_TOKEN_KEY = 'accessToken';


export function AuthProvider({ children }) {
const [accessToken, setAccessToken] = useState(() => localStorage.getItem(ACCESS_TOKEN_KEY));
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);


useEffect(() => {
if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
else localStorage.removeItem(ACCESS_TOKEN_KEY);
}, [accessToken]);


const saveAccessToken = (token) => setAccessToken(token);


const logout = async () => {
// call revoke endpoint (server will revoke cookie-based refresh token)
try {
await fetch('http://localhost:3000/api/auth/revoke', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' } });
} catch (e) {
// ignore
}
setAccessToken(null);
setUser(null);
};


const value = {
accessToken,
setAccessToken: saveAccessToken,
user,
setUser,
logout,
loading,
setLoading
};


return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}