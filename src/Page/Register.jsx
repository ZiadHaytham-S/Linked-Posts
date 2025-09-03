import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sendRegisterData} from "../Services/authServices";
import { useState } from "react";
import { schema } from "../Schema/RegisterSchema";
import { Link, useNavigate } from "react-router-dom";




export default function Register() {

  const [loading, setLoading] = useState(false)
  const [apiError, setapiError] = useState(false)



  
  const {handleSubmit , register , formState:{errors}} = useForm({
    defaultValues: {
      name: '',
    email:'',
    password:'',
    rePassword: '',
    dateOfBirth:'',
    gender:''

    } , 
    resolver : zodResolver(schema),
    mode: 'onBlur'
    
  })

  let navigate = useNavigate()

 async function signUp (userData) {

  setLoading(true)

  let response = await  sendRegisterData(userData);

    if (response.message) {
      navigate('/login')
  
    }else{
      setapiError(response.error)
    }

    setLoading(false)
    console.log(response);
    
}


  

  return (
    <>
      <div className="bg-white shadow-2xl py-10 px-6 min-w-md">
      <h2 className="text-2xl mb-4 text-center">Register Now</h2>
      
        <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-6">
          
         <Input isInvalid={errors.name} errorMessage={errors.name?.message} variant="bordered" label="Name" {...register('name' , {required : 'Name is Required' }) } type="text" />


         <Input isInvalid={errors.email} errorMessage={errors.email?.message} variant="bordered" label="Email" {...register('email')} type="email" />


         <Input isInvalid={errors.password} errorMessage={errors.password?.message} variant="bordered" label="Password" {...register('password')} type="password" />


         <Input isInvalid={errors.rePassword} errorMessage={errors.rePassword?.message} variant="bordered" label="rePassword" {...register('rePassword')} type="password" />


        <div className="flex gap-4">
 <Input isInvalid={errors.dateOfBirth} errorMessage={errors.dateOfBirth?.message} variant="bordered" label="DateOfBirth" {...register('dateOfBirth')} type="date" />
         
         <Select isInvalid={errors.gender} errorMessage={errors.gender?.message}  variant="bordered" {...register('gender')} label="Select Your Gender">
        
          <SelectItem key={'male'}>Male</SelectItem>
          <SelectItem key={'feMale'}>feMale</SelectItem>
       
      </Select>

        </div>
        <Button isLoading={loading} type="submit">Register</Button>
              <div>if you haven't account please, <Link to={'/login'} className='text-blue-500 hover:text-blue-800 hover:duration-500'>Sign in</Link></div>

        {apiError && <span className="text-center text-red-500"> {apiError} </span>}
        </form>
        
        </div> 

      
    
    </>
  );
}
