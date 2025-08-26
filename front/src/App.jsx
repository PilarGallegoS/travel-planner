import './App.css'

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from 'react'
import NavBar from './components/NavBar.jsx'
import TripDetails from './pages/TripDetails.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App
