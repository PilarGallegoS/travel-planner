import './App.css'

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from 'react'
import NavBar from './components/NavBar.jsx'
import TripDetails from './pages/TripDetails.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trip/:id" element={<TripDetails />} />
      </Routes>
    </Router>
  );
}

export default App
