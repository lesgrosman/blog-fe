import * as yup from 'yup'

export type SignInForm = {
  username: string
  password: string
}

export type SignUpForm = {
  username: string
  password: string
  firstName: string
  lastName: string
}

export const signinSchema = yup.object({
  username: yup.string().required('Username is required').min(4, 'Minimun length is 4 charachters'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password should contain at least 1 uppercase, 1 lowercase, and 1 number'
    )
    .min(9, 'Minimun length is 9 charachters'),
})

export const signupSchema = yup.object({
  username: yup.string().required('Username is required').min(4, 'Minimun length is 4 charachters'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password should contain at least 1 uppercase, 1 lowercase, and 1 number'
    )
    .min(9, 'Minimun length is 9 charachters'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
})
