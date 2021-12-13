import './App.css';
import react from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { UserContext } from './context/UserProvider';
import {useContext} from 'react'
import Profile from './components/Profile'
import Auth from './components/Auth'
import Navbar from './components/Navbar'
import Public from './components/Public'



export default function App(){
  const {token} = useContext(UserContext)
  return (
    <div className="app">
      {<Navbar />}
      <Routes>
        <Route 
          exact path="/" 
          element = {token ? <Navigate replace to = "/profile" /> : <Auth />}
        />
        <Route 
          path="/profile"
         element = {!token ? <Navigate replace to = '/' /> : <Profile />}
        />
        <Route 
          path="/public"
          element={<Public />}
        />
      </Routes>
    </div>
  )
}