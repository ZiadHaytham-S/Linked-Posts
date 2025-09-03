import React, { useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext'

export default function ProductedRoute({children}) {

    let {LoggedIn} = useContext(AuthContext)
    return LoggedIn? children : <Navigate to={'/login'}/>
}
