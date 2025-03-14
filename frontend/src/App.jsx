import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Loader } from "lucide-react";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});

  // now we error handled cors issue, now comes the signup page
  // but lets first add the loading state inside the app.jsx while it loads
  // implementing loading state
  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )
  
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={ authUser ? <Home /> : <Navigate to="/login" /> } /> {/* if user is authenticated, show Home page, else show Login page */}
        <Route path="/signup" element={authUser ? <Signup /> : <Navigate to="/" /> } /> {/* If user is already authenticated, then user should go to home page */}
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" /> } />

      </Routes>

    </div>
  )
}

export default App
