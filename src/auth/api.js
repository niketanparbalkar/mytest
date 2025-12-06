import { useAuth } from './AuthProvider';


export async function apiFetch(url, options = {}, getAccessToken, setAccessToken) {
// options: { method, headers, body }
const token = getAccessToken();
const headers = options.headers || {};
if (token) headers['Authorization'] = `Bearer ${token}`;


// always send cookies (refresh token cookie is HttpOnly)
const opts = { credentials: 'include', ...options, headers };


let res = await fetch(url, opts);


if (res.status === 401) {
// try refresh
const refreshed = await tryRefresh(getAccessToken, setAccessToken);
if (!refreshed) return res; // return original 401 response


// retry original request with new token
const newToken = getAccessToken();
if (newToken) headers['Authorization'] = `Bearer ${newToken}`;
const retryOpts = { credentials: 'include', ...options, headers };
res = await fetch(url, retryOpts);
}


return res;
}


async function tryRefresh(getAccessToken, setAccessToken) {
try {
const res = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
if (!res.ok) return false;
const data = await res.json();
// server returns { accessToken, refreshToken } — refresh token is also set as cookie, but keep access token
if (data.accessToken) setAccessToken(data.accessToken);
return true;
} catch (e) {
return false;
}
}