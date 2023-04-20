import { AxiosCustomError } from '@/utils/types'
import { FormProvider, useForm } from 'react-hook-form'
import { SignUpForm, signupSchema } from './utils'
import { signup } from './mutations'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@/components/Button'
import Link from 'next/link'
import TextInput from '@/components/Form/TextInput'

const SignUp = () => {
  const router = useRouter()
  const { mutate, error, isLoading } = useMutation<void, AxiosCustomError, SignUpForm>(signup, {
    onSuccess: () => router.push('/signin'),
  })

  const methods = useForm<SignUpForm>({
    defaultValues: {
      password: '',
      username: '',
      firstName: '',
      lastName: '',
    },
    resolver: yupResolver(signupSchema),
    mode: 'onSubmit',
  })
  const handleSubmit = methods.handleSubmit((data: SignUpForm) => {
    mutate(data)
  })

  return (
    <div className='max-w-xl m-auto mt-10'>
      <h2 className='text-center mb-10'>Sign Up</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <TextInput name='username' label='Username' />
          <TextInput name='password' label='Password' />
          <TextInput name='firstName' label='First Name' />
          <TextInput name='lastName' label='Last Name' />
          <div className='flex sm:justify-end justify-center mt-2'>
            <Button label='Sign up' type='submit' disabled={isLoading} />
          </div>
          {error && <span className='text-error text-end'>{error?.response?.data.message}</span>}
        </form>
      </FormProvider>
      <p className='text-center mt-6'>
        Already have an account?
        <Link href='/signin' className='text-primary-default hover:underline ml-2'>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignUp
