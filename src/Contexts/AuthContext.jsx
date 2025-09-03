import { createContext, useEffect, useState } from "react";
import { userDataApi } from "../Services/authServices";



export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    
    const [LoggedIn, setLoggedIn] = useState(localStorage.getItem('token') != null);
    const [userData, setUserData] = useState(null);
    
    async function getUserData() {
       const response =   await userDataApi();
       if (response.message) {
        setUserData(response.user);
       }
    }
    useEffect(()=> {
        if (LoggedIn) {
            
            getUserData();
        }
    } , [LoggedIn])

    return <AuthContext.Provider value={{LoggedIn , setLoggedIn , userData , setUserData , getUserData}}>
        {children}
    </AuthContext.Provider>
    
}