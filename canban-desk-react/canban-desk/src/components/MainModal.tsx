import { createPortal } from "react-dom";
import { useEffect, type ReactNode } from "react";
import { Button } from "antd/es/radio";
import { Modal } from "antd";
import '../styles/modal.css';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

function MainModal({ isOpen, children, onClose}: ModalProps) {

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
    <Modal className="modal-overlay" footer ={null}  open={isOpen}>
      <div className="modal-content" role="dialog" onClick={(e) => e.stopPropagation()}>
        <Button  type = "main" className="modal-close" onClick={onClose}>X</Button>
        {children}
      </div>
    </Modal>,
    document.body
  );
}

export default MainModal;