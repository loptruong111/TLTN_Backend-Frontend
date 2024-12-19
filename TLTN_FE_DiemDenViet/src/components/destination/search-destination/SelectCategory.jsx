import { Button, Label, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService";
import SubcategoryService from "../../../services/SubcategoryService";
import { IoIosArrowForward } from "react-icons/io";

export default function SelectCategory({ formData, setFormData }) {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setcategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    setSelectedCategory(formData?.category?.categoryId || "");
    setSelectedSubcategory(formData?.category?.subcategoryId || "");
  }, []);

  useEffect(() => {
    const fetchcategories = async () => {
      const res = await CategoryService.getForSelect();
      if (res.status) {
        setcategories(res.data.data);
      }
    };
    fetchcategories();
  }, []);
  useEffect(() => {
    const fetchsubcategories = async () => {
      if (!selectedCategory) return;
      const queryParams = new URLSearchParams({
        categoryId: selectedCategory,
      }).toString();
      const res = await SubcategoryService.getForSelect(queryParams);
      if (res.status) {
        setSubcategories(res.data.data);
      }
    };
    fetchsubcategories();
  }, [selectedCategory]);

  const handleConfirm = () => {
    setFormData({
      ...formData,
      category: {
        categoryId: selectedCategory,
        subcategoryId: selectedSubcategory,
      },
    });
    setOpenModal(false);
  };
  const getCategoryName = (id) =>
    categories.find((category) => category._id === id)?.name || "";
  const getSubcategoryName = (id) =>
    subcategories.find((subcategory) => subcategory._id === id)?.name || "";

  const buttonText =
    selectedCategory || selectedSubcategory
      ? `${getCategoryName(selectedCategory)} - ${getSubcategoryName(
          selectedSubcategory
        )}`
      : "Chọn loại điểm đến";

  return (
    <div>
      <Button
        outline
        color="light"
        className="hover:border-black rounded-sm"
        onClick={() => setOpenModal(true)}
      >
        {buttonText}
        <IoIosArrowForward className="mr-2 h-5 w-5" />
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Chọn lạo điểm đến</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Label htmlFor="category">Loại điểm đến</Label>
            <Select
              id="category"
              value={selectedCategory || ""}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory("");
              }}
            >
              <option value="">Chọn loại điểm đến</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>

            {/* Chọn Quận/Huyện */}
            <Label htmlFor="subcategory">Loại điểm đến cụ thể</Label>
            <Select
              id="subcategory"
              value={selectedSubcategory || ""}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">Chọn điểm đến cụ thể</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleConfirm}>Xác nhận</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
