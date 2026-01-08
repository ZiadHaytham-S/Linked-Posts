import React, { useContext, useState, useEffect } from "react";
import {Navbar as HeroUi, NavbarBrand, NavbarContent, NavbarItem,  Button} from "@heroui/react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";


export default function Navbar() {

  let {LoggedIn , setLoggedIn}= useContext(AuthContext)

  const navigate = useNavigate()
  function LogOut() {
    localStorage.removeItem('token');
    setLoggedIn(null)
    navigate('/login')
  }

  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <>
      <HeroUi className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <NavbarBrand>
        <Link to={'/'} className="font-bold text-gray-900 dark:text-white cursor-pointer flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3.172 7.172a4 4 0 015.656 0L10 8.343l1.172-1.171a4 4 0 115.656 5.656L10 20 3.172 13.172a4 4 0 010-5.656z" />
          </svg>
          Linked Posts
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">

        {/* Dark mode toggle */}
        <div className="mr-3">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle dark mode"
            className="p-2 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-0 text-gray-600 dark:text-yellow-400"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
        </div>

       {LoggedIn ? (
         <>
           <NavbarItem className="cursor-pointer p-2 flex items-center gap-2 rounded-md focus:outline-none focus:ring-0 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={LogOut} >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
             </svg>
             <span className="hidden sm:inline">Sign Out</span>
           </NavbarItem>
           <Link to={'/profile?tab=photo'} className="ml-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
             </svg>
           </Link>
         </>
        ) : (
          <>
            <NavbarItem>
              <NavLink
                to={'/register'}
                className={({ isActive }) =>
                  `inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-shadow focus:outline-none shadow-sm ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`
                }
              >
                Sign Up
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                to={'/login'}
                className={({ isActive }) =>
                  `inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition border ${
                    isActive
                      ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-gray-800'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:bg-transparent dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'
                  }`
                }
              >
                Sign in
              </NavLink>
            </NavbarItem>
          </>
        )}

      </NavbarContent>
    </HeroUi>
    </>
  );
}
