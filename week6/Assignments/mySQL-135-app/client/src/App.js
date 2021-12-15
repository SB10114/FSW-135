import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import { UserContext } from './context/UserProvider';
import React, {useContext} from 'react'
import Profile from './components/Profile'
import Auth from './components/Auth'
import Navbar from './components/Navbar'
import Public from './components/Public'
import ProtectedRoute from './components/ProtectedRoute';


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
        <ProtectedRoute 
          path="/profile"
          component = {Profile}
          redirectTo = '/'
          token = {token}
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