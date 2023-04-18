import { FormProvider, useForm } from 'react-hook-form'
import { SignForm, signSchema } from './utils'
import { yupResolver } from '@hookform/resolvers/yup'
import FormView from './FormView'

const SignUp = () => {
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
    <div className='max-w-xl m-auto mt-10'>
      <h2 className='text-center mb-10'>Sign Up</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <FormView />
        </form>
      </FormProvider>
    </div>
  )
}

export default SignUp
