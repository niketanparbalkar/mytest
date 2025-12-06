import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import api1 from '../auth/api1';
import './LoginPage.css'; // <-- import CSS
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../store/authSlice';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setAccessToken1 } = useAuth();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);

  //   try {
  //     const res = await api1.post("/auth/login", {
  //       userNameOrEmail: userName,
  //       password,
  //     });

  //     if (res?.data?.accessToken) {
  //       setAccessToken(res.data.accessToken);
  //       localStorage.setItem("accessToken", res.data.accessToken);
  //       navigate("/dashboard");
  //     }
  //   } catch (err) {
  //     if (err.response) setError(err.response.data || "Login failed");
  //     else setError("Network error");
  //   }
  // };

const dispatch = useDispatch();
const handleSubmit = async (e) => {
  alert('hi');
  debugger;
  e.preventDefault();
  setError(null);
  try {
    const res = await api1.post("/auth/login", {
      userNameOrEmail: userName,
      password,
    });
    alert('hi');
    console.log(res);
    

    if (res?.data?.accessToken) {   
      dispatch(setAccessToken(res.data.accessToken)); // store in Redux
      navigate("/dashboard");
    }
  } catch (err) {
    if (err.response) setError(err.response.data || "Login failed");
    else setError("Network error");
  }
};

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username or Email</label>
        <input
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
        <button>Login</button>
      </form>
    </div>
  );
}
