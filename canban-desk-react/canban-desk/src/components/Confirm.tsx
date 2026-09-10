import { Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "../styles/confirm.css";

type ConfirmProps = {
  confirmSave: () => void;
  confirmDelete: () => void;
  action: "edit" | "delete" | null;
};
function Confirm({ confirmSave, confirmDelete, action }: ConfirmProps) {
  return (
    <div className="confirm-content">
    <ExclamationCircleOutlined className="confirm-icon" />

    <p>Подтвердить действие?</p>

    {action === "edit" ? (
      <Button type="primary" onClick={confirmSave}>
        OK
      </Button>
    ) : (
      <Button danger type="primary" onClick={confirmDelete}>
        OK
      </Button>
    )}
  </div>
  );
}

export default Confirm;
