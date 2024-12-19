import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DeleteConfirmModal({ handleDelete, itemId, onCLose }) {
  const confirmDelete = () => {
    handleDelete(itemId);
  };

  return (
    <Modal show={true} size="md" onClose={onCLose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
          <h3 className="mb-5 text-xl font-bold text-gray-500">
            Xác nhận xóa?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={confirmDelete}>
              Xóa
            </Button>
            <Button color="gray" onClick={onCLose}>
              Quay lại
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
