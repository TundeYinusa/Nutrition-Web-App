import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import Notfound from './Components/Notfound.jsx'
import Track from './Components/Track.jsx'
import { UserContext } from './Context/UserContext.jsx'
import Private from './Components/Private.jsx'
import Diet from './Components/Diet.jsx'


function App() {

  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("Nutrify-User")));

  // useEffect(() => {
  //   console.log("Logged User: ", loggedUser);
  // }, [])




  return (
    <>

      <UserContext.Provider value={{loggedUser, setLoggedUser}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/track" element={ < Private Component = {Track} /> } />
            <Route path="/diet" element={ < Private Component = {Diet} /> } />
            
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>

      </UserContext.Provider>

    </>
  )
}

export default App
