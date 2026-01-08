import * as zod from 'zod';

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must be at most 20 characters'),

    email: zod
      .string()
      .nonempty('Email is required')
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format'
      ),

    password: zod
      .string()
      .nonempty('Password is required')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character'
      ),

    rePassword: zod.string().nonempty('Confirm Password is required'),

    dateOfBirth: zod.coerce
      .date()
      .refine((value) => {
        const now = new Date().getFullYear();
        const birthYear = value.getFullYear();
        const age = now - birthYear;
        return age >= 18;
      }, 'You must be at least 18 years old'),

    gender: zod.string().nonempty('Select your gender'),
  })
  .refine((data) => data.rePassword === data.password, {
    path: ['rePassword'],
    message: 'Passwords do not match',
  });
