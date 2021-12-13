import React, { useState } from 'react'
import axios from 'axios'
export const UserContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        todos: []
    }

    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post('/signup', credentials)
            .then (res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch (err => console.log(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('/login', credentials)
            .then (res => {
                const {user, token} = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getUserIssues()
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch (err => console.dir(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({user: {}, token: '', issues: []})
    }

    function addIssues(newIssue) {
        userAxios.post('/api/Issue', newIssue)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                Issues: [...prevState.Issues, res.data]
            }))     
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getUserIssues() {
        userAxios.post('/api/Issue/user')
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                Issues: res.data
            }))     
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider value={ { ...userState, signup, login, logout, addIssues} }>
            { props.children }
        </UserContext.Provider>
    )
}