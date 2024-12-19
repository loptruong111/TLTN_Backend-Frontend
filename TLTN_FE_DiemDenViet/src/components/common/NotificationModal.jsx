import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function NotificationModal({
  notification,
  reloadPage,
  navigateTo,
}) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);

  const handleClose = () => {
    setOpenModal(false);
    if (navigateTo) {
      navigate(navigateTo);
    } else if (reloadPage) {
      window.location.reload();
    }
  };

  return (
    <Modal show={openModal} size="md" onClose={handleClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
          <h3 className="mb-5 text-xl font-semibold text-gray-500">
            {notification}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color={reloadPage || navigateTo ? "success" : "failure"}
              onClick={handleClose}
            >
              Đóng
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
