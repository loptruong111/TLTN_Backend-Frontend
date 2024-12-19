import { Modal, Spinner } from "flowbite-react";
import { useState } from "react";

export function LoadingModal({ notificationLoading }) {
  const [openModal, setOpenModal] = useState(true);
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Thông báo</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
            <p className="text-2xl mt-3">{notificationLoading}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
