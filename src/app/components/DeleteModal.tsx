import React, { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  buttonAction: () => void
  children: ReactNode
}

const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  buttonAction,
  children,
}) => {
  if (isOpen) {
    return (
      <div className="absolute bottom-0 left-0 z-50 flex h-full w-full items-center justify-center  bg-black/20 backdrop-blur-sm transition-opacity">
        <div className="flex h-max w-80 flex-col justify-between rounded border border-gray-400 bg-white px-5 py-6 dark:bg-gray-800">
          <div className="pb-5 text-center">{children}</div>
          <div className="flex w-full items-center justify-center gap-7">
            <button
              type="button"
              className="font-alt w-28 rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold uppercase leading-none text-black hover:bg-gray-200"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="font-alt w-28 rounded-xl bg-red-400 px-5 py-3 text-sm font-semibold uppercase leading-none text-black hover:bg-red-500"
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
