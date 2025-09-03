import * as zod from 'zod'
export const schemaLogin = zod.object({

     email: zod.string().nonempty('')
             .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , `Email Not Correct`),
   
     password: zod.string().nonempty('Password Is Requried')
             .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , `BLA BLA`)

})