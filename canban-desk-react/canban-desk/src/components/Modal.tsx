import { createPortal } from "react-dom";
import { useEffect, type ReactNode } from "react";
import '../styles/modal.css';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

function Modal({ isOpen, children, onClose }: ModalProps) {

  useEffect(() => {
    if (!isOpen) return;
    
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            onClose();
        }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
        document.removeEventListener("keydown", handleKeyDown);
    };

  }, [isOpen, onClose]);
  
   if (!isOpen) {
        return null;
    }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;