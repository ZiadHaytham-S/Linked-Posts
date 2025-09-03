import * as zod from 'zod'


export const schema = zod.object({

  name: zod.string().nonempty('Name is Requried').min(3 , 'Name Must Be At Least 3 Characters').max(20, 'Name Must Be At Must 20 Characters'),

  email: zod.string().nonempty('Email Is Requried')
          .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , `Email Is Required`),

  password: zod.string().nonempty('Password Is Requried')
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , `BLA BLA`),
  rePassword: zod.string().nonempty('rePassword is Required')        , 

  dateOfBirth: zod.coerce.date('Select Your Age')
    .refine((value)=> {

      const userAge = value.getFullYear()
      const Now = new Date().getFullYear()
      const age = Now - userAge
      return age >= 18 
    } , 'Hello Enta So8er') , 


    gender: zod.string().nonempty('Select Your Gender')

}).refine((data)=> data.rePassword === data.password , {path: ['rePassword'] , message : 'RePassword Not Match'} );