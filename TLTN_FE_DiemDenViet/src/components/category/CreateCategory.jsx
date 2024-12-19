import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import CategoryService from "../../services/CategoryService";
import NotificationModal2 from "../common/NotificationModal2";

export default function CreateCategory() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [notification, setNotification] = useState(null);

  const handleCreate = async () => {
    try {
      const res = await CategoryService.post(formData);

      if (res.status) {
        setNotification({
          message: res.message,
          reloadPage: true,
        });
      } else {
        setNotification({
          message: res.message,
          reloadPage: false,
        });
      }
    } catch (error) {
      setNotification({
        message:
          error.response?.data?.message ||
          "Đã xảy ra lỗi, vui lòng thử lại sau.",
        reloadPage: false,
      });
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Tạo mới danh mục chính</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tạo mới danh mục chính</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Tên danh mục chính" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Nhập tên danh mục chính"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Hủy
          </Button>
          <Button onClick={handleCreate}>Tạo mới</Button>
        </Modal.Footer>
      </Modal>

      {notification && (
        <NotificationModal2
          notification={notification.message}
          reloadPage={notification.reloadPage}
        />
      )}
    </>
  );
}
