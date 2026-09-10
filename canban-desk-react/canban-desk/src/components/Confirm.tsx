import { Button } from "antd";

type ConfirmProps = {
  confirmSave: () => void;
  confirmDelete: () => void;
  action: "edit" | "delete" | null;
};
function Confirm({ confirmSave, confirmDelete, action }: ConfirmProps) {
  return (
    <>
      <p>Подтвердить дейстиве</p>
      {action === "edit" ? (
        <Button onClick={confirmSave}>ОK</Button>
      ) : (
        <Button onClick={confirmDelete}>OK</Button>
      )}
    </>
  );
}

export default Confirm;
