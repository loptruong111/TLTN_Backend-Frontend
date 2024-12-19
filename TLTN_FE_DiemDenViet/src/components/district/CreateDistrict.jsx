import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import DistrictService from "../../services/DistrictService";
import NotificationModal2 from "../common/NotificationModal2";
import ProvinceService from "../../services/ProvinceService";

export default function CreateDistrict() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", provinceId: "" });
  const [notification, setNotification] = useState(null);
  const [provinces, setcategories] = useState([]);

  useEffect(() => {
    const fetchcategories = async () => {
      const res = await ProvinceService.getForSelect();
      if (res.status) {
        setcategories(res.data.data);
      }
    };
    fetchcategories();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await DistrictService.post(formData);

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
      <Button onClick={() => setOpenModal(true)}>Tạo mới quận huyện</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Tạo mới quận huyện</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Tên quận huyện" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Nhập tên quận huyện"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Tỉnh thành" />
              </div>
              <Select
                id="province"
                value={formData.provinceId}
                onChange={(e) =>
                  setFormData({ ...formData, provinceId: e.target.value })
                }
              >
                <option>--Chọn--</option>
                {provinces.map((province) => (
                  <option key={province._id} value={province._id}>
                    {province.name}
                  </option>
                ))}
              </Select>
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
