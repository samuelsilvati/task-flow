/* eslint-disable no-redeclare */
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import Loading from './Loading'

interface Loading
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean
}

const Button: FC<Loading> = ({ loading, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading}
      className="h-12 rounded-lg bg-yellow-500 text-lg text-black transition-colors hover:bg-yellow-400"
    >
      {loading ? <Loading /> : props.children}
    </button>
  )
}

export default Button
