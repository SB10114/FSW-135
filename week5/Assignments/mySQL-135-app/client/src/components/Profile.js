import React, {useContext} from 'react'
import IssuesForm from './IssuesForm'
import IssuesList from './IssuesList'
//import Issues from './Issues'
import { UserContext } from '../context/UserProvider'

export default function Profile() {
    const {user: {userName}, addIssues, issues} = useContext(UserContext)
    
    return (
        <div className = "profile">
            <h1>Welcome @{userName}!</h1>
            <h3>Add Issues</h3>
            <IssuesForm addIssues={addIssues} />
            <h3>Your Issues</h3>
            <IssuesList issues={issues} />
        </div>
    )
}