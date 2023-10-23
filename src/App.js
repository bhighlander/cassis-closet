import logo from './logo.svg';
import './App.css';
import { ApplicationViews } from './components/views/ApplicationViews';
import { useState } from 'react';

export const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const setNewToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  return (
    <>
      {/* <Navbar token={token} setToken={setNewToken} /> */}
      <ApplicationViews token={token} setToken={setNewToken} />
    </>
  );
}