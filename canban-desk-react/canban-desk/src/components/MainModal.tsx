import { createPortal } from "react-dom";
import { type ReactNode } from "react";
import { Button } from "antd";
import { Modal } from "antd";


type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

function MainModal({ isOpen, children, onClose }: ModalProps) {
  return createPortal(
    <Modal
      open={isOpen}
      closable={false}
      onCancel={onClose}
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
