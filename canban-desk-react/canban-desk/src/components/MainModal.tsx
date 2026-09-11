import { createPortal } from "react-dom";
import { useEffect, type ReactNode } from "react";
import { Button } from "antd";
import { Modal } from "antd";
import "../styles/modal.css";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

function MainModal({ isOpen, children, onClose }: ModalProps) {
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
    <Modal
      open={isOpen}
      closable={false}
      footer={
        <div className="modal-actions">
          <Button onClick={onClose}>Закрыть</Button>
        </div>
      }
    >
      <div role="dialog">{children}</div>
    </Modal>,
    document.body,
  );
}

export default MainModal;
