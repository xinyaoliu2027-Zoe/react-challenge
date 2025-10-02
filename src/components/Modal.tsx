import { type PropsWithChildren } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: PropsWithChildren<ModalProps>) => (
  !isOpen ? null : (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75"
         onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto relative"
           onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  )
);

export default Modal;