import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar.jsx'
import TripPanel from './components/TripPanel.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar></NavBar>
      <TripPanel
        name="Viaje a Berlín"
        destination="Alemania"
        startDate="2025-06-10"
        endDate="2025-06-15"
      />      
    </>
  )
}

export default App
