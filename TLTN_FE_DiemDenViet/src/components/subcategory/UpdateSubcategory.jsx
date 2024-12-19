import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import SubcategoryService from "../../services/SubcategoryService";
import NotificationModal2 from "../common/NotificationModal2";
import CategoryService from "../../services/CategoryService";

export default function UpdateSubcategory({ item, onCLose }) {
  const [formData, setFormData] = useState({
    name: item.name,
    categoryId: item.category._id,
    isDeleted: item.isDeleted,
  });
  const [categories, setcategories] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchcategories = async () => {
      const res = await CategoryService.getForSelect();
      if (res.status) {
        setcategories(res.data.data);
      }
    };
    fetchcategories();
  }, []);
  const handleUpdate = async () => {
    try {
      const res = await SubcategoryService.put(item._id, formData);

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
        <Modal.Header>Chỉnh sửa danh mục phụ</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Tên danh mục phụ" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Nhập tên danh mục phụ"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Danh mục chính" />
              </div>
              <Select
                id="category"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
              >
                <option>--Chọn--</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
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
