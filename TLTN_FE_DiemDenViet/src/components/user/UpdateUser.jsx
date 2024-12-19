import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import NotificationModal2 from "../common/NotificationModal2";
import UserService from "../../services/UserService";

export default function UpdateUser({ item, onCLose }) {
  const [formData, setFormData] = useState({
    isAdmin: item.isAdmin,
    isDeleted: item.isDeleted,
  });
  const [notification, setNotification] = useState(null);

  const handleUpdate = async () => {
    try {
      const res = await UserService.putByAdmin(item._id, formData);

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
      <Modal show={true} onClose={onCLose}>
        <Modal.Header>Chỉnh sửa tài khoản</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" value="Tên tài khoản" />
              <TextInput id="name" type="text" value={item.name} disabled />
            </div>
            <div>
              <Label htmlFor="name" value="Tên đăng nhập" />
              <TextInput id="name" type="text" value={item.username} disabled />
            </div>
            <div>
              <Label htmlFor="isAdmin" value="Quyền" />
              <Select
                id="isAdmin"
                value={formData.isAdmin}
                onChange={(e) =>
                  setFormData({ ...formData, isAdmin: e.target.value })
                }
                required
              >
                <option value={true}>Quản trị</option>
                <option value={false}>Người dùng</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="isDeleted" value="Khóa truy cập" />
              <Select
                id="isDeleted"
                value={formData.isDeleted}
                onChange={(e) =>
                  setFormData({ ...formData, isDeleted: e.target.value })
                }
                required
              >
                <option value={true}>Khóa</option>
                <option value={false}>Không khóa</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={onCLose}>
            Hủy
          </Button>
          <Button onClick={handleUpdate}>Chỉnh sửa</Button>
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
