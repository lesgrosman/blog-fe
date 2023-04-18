import Button from '@/components/Button'
import TextInput from '@/components/Form/TextInput'

const FormView = () => {
  return (
    <>
      <TextInput name='username' label='Username' />
      <TextInput name='password' label='Password' />
      <div className='flex sm:justify-end justify-center mt-2'>
        <Button label='Sign up' type='submit' />
      </div>
    </>
  )
}

export default FormView
