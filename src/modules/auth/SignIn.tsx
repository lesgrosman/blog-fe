import { FormProvider, useForm } from 'react-hook-form'
import { SignInForm, signinSchema } from './utils'
import { useAuth } from '@/utils/hooks/useAuth'
import { useAuthContext } from '@/providers/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@/components/Button'
import Link from 'next/link'
import TextInput from '@/components/Form/TextInput'

const SignIn = () => {
  const { isUser } = useAuthContext()
  const router = useRouter()
  const { login, error, loading } = useAuth()

  const methods = useForm<SignInForm>({
    defaultValues: {
      password: '',
      username: '',
    },
    resolver: yupResolver(signinSchema),
    mode: 'onSubmit',
  })
  const handleSubmit = methods.handleSubmit((data: SignInForm) => {
    login(data)
  })

  useEffect(() => {
    if (isUser) router.push('/profile/my-posts')
  }, [isUser])

  return (
    <div className='max-w-xl m-auto mt-10 w-full'>
      <h2 className='text-center mb-10'>Sign In</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <TextInput name='username' label='Username' />
          <TextInput name='password' label='Password' />
          <div className='flex sm:justify-end justify-center mt-2'>
            <Button label='Sign up' type='submit' disabled={loading} />
          </div>
          {error && <span className='text-error text-end'>{error?.response?.data.message}</span>}
        </form>
      </FormProvider>
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
