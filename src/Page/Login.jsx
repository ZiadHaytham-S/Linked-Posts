import { Button, Input } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendLoginData } from '../Services/authServices'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaLogin } from '../Schema/LogInSchema'
import { AuthContext } from '../Contexts/AuthContext'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [apiError, setapiError] = useState(false)
  

  const {handleSubmit , register , formState:{errors}}= useForm({

    defaultValues:{
      email: '',
      password: ''
    },
    resolver: zodResolver(schemaLogin),
    mode : 'onBlur'

  })

const navigate = useNavigate();
const {setLoggedIn} = useContext(AuthContext)

async  function Login(userData) {
    
    setLoading(true)
    const response = await  sendLoginData(userData)
      if (response.message) {
        localStorage.setItem('token' , response.token)
        setLoggedIn(response.token)
        navigate('/')
      }else{
        setapiError(response.error)
      }
    setLoading(false)

  }
  return <>

    <div className="bg-white dark:bg-gray-800 shadow-2xl min-w-md py-7 px-6 rounded-lg">
      <h2 className='text-center mb-4 text-2xl text-gray-900 dark:text-white'>Login Now</h2>
      <form onSubmit={handleSubmit(Login)} className='flex flex-col gap-4'>

          <Input variant='bordered' isInvalid={Boolean(errors.email)} errorMessage={errors.email?.message} {...register('email')} label="Email" type="email" className="dark:bg-gray-700" />
       
          <Input  variant='bordered' isInvalid={Boolean(errors.password)} errorMessage={errors.password?.message} {...register('password')} label="Password" type="password" className="dark:bg-gray-700" />

      <Button isLoading={loading} type='submit' color="default">Login</Button>
      <div className="dark:text-gray-300">if you haven't account please, <Link to={'/register'} className='text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 hover:duration-500'>Sign Up</Link></div>
        {apiError && <span className='text-center text-red-500 dark:text-red-400'> {apiError} </span>}
      </form>
    </div>

  </>
}
