import { FormProvider, useForm } from 'react-hook-form'
import { SignForm, signSchema } from './utils'
import { yupResolver } from '@hookform/resolvers/yup'
import FormView from './FormView'
import Link from 'next/link'

const SignIn = () => {
  const methods = useForm<SignForm>({
    defaultValues: {
      password: '',
      username: '',
    },
    resolver: yupResolver(signSchema),
    mode: 'onSubmit',
  })
  const handleSubmit = methods.handleSubmit((data: SignForm) => {
    console.log(data)
  })

  return (
    <div className='max-w-xl m-auto mt-10 w-full'>
      <h2 className='text-center mb-10'>Sign In</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <FormView />
        </form>
      </FormProvider>
      <div></div>
      <p className='text-center mt-6'>
        Dont have an account?
        <Link href='/signup' className='text-primary-default hover:underline ml-2'>
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default SignIn
