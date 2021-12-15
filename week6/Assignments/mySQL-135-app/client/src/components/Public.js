import React, {useContext} from 'react'
import {UserContext} from '../context/UserProvider'
import IssuesForm from './IssuesForm'

export default function Public(){
  const {
    user: { username }, createIssue } = useContext(UserContext)
  
    return (
      <div id="public">
          <h1>Hello</h1>
      </div>
    )
  }