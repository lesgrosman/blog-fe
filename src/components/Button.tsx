import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  outline?: boolean
  innerClassName?: string
  onClick?: () => void
}

const Button = ({ label, outline, disabled, innerClassName, ...rest }: Props) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`${innerClassName} outline-0 border-1 rounded-xl py-2 px-10 ${
        disabled
          ? 'bg-disabled text-white'
          : outline
          ? 'bg-transparent text-primary-default border-primary-default cursor-pointer'
          : 'hover:bg-primary-dark bg-primary-default text-white cursor-pointer'
      }`}
    >
      {label}
    </button>
  )
}

export default Button
