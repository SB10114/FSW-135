import React from "react"
import {Route, Redirect} from "react-router-dom"

export default function protectedRoute(props){
    const {path, redirectTo, component: C, token, ... rest} = props
    return token?
    <Route path = {path} render={() => < c {...rest}/>} /> :
    <Redirect to = {redirectTo} />
}
