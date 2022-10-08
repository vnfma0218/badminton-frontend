import { Path, UseFormRegister } from 'react-hook-form'
import { AuthInputs } from 'src/pages/login'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string
  register: UseFormRegister<AuthInputs>
  fieldName: Path<AuthInputs>
  maxLength?: number
}

const Input = ({ register, fieldName, title, required, maxLength, ...props }: InputProps) => {
  return <input {...props} />
}
export default Input
