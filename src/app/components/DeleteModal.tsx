import React, { ReactNode } from 'react'
import Loading from './Loading'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  buttonAction: () => void
  children: ReactNode
  isLoading?: boolean
}

const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  buttonAction,
  children,
  isLoading,
}) => {
  if (isOpen) {
    return (
      <div className="absolute bottom-0 left-0 z-50 flex h-full w-full items-center justify-center  bg-black/20 backdrop-blur-sm transition-opacity">
        <div className="flex h-max w-80 flex-col justify-between rounded border border-gray-400 bg-white px-5 py-6 dark:bg-gray-800">
          {isLoading ? (
            <div className="absolute left-0 top-0 h-full w-full bg-black/20 backdrop-blur-sm transition-opacity">
              <Loading />
            </div>
          ) : (
            <></>
          )}
          <div className="pb-5 text-center">{children}</div>
          <div className="flex w-full items-center justify-center gap-7">
            <button
              type="button"
              className="font-alt w-28 rounded-xl bg-gray-100 py-3 text-center text-sm font-semibold uppercase leading-none text-black hover:bg-gray-200"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="font-alt w-28 rounded-xl bg-red-400 py-3 text-center text-sm font-semibold uppercase leading-none text-black hover:bg-red-500"
              onClick={buttonAction}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default DeleteModal
