import './App.css';
import { ApplicationViews } from './components/views/ApplicationViews';
import { useState } from 'react';
import { Navbar } from './nav/Navbar';

export const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const setNewToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  return (
    <>
      <ApplicationViews token={token} setToken={setNewToken} />
      <Navbar token={token} setToken={setNewToken} />
    </>
  );
}