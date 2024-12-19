import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import WardService from "../../services/WardService";
import NotificationModal2 from "../common/NotificationModal2";
import SelectAddress2 from "../address/SelectAddress2";

export default function UpdateWard({ item, onCLose }) {
  const [formData, setFormData] = useState({
    name: item.name,
    proviceId: item.proviceId,
    districtId: item.districtId,
    isDeleted: item.isDeleted,
  });
  const [notification, setNotification] = useState(null);

  const handleUpdate = async () => {
    try {
      const res = await WardService.put(item._id, formData);

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
        <Modal.Header>Chỉnh sửa tỉnh thành</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Tên tỉnh thành" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Nhập tên tỉnh thành"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <SelectAddress2 formData={formData} setFormData={setFormData} />
            <div>
              <div>
                <Label htmlFor="isDeleted" value="Khóa truy cập" />
              </div>
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
