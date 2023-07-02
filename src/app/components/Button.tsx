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
      className={`${
        loading
          ? 'h-10 w-full rounded-lg bg-yellow-400 text-lg text-black transition-colors'
          : 'h-10 w-full rounded-lg bg-yellow-500 text-lg text-black transition-colors hover:bg-yellow-400'
      }`}
    >
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <svg
            className="h-5 w-5 animate-spin text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        props.children
      )}
    </button>
  )
}

export default Button
