import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import SelectProvince from "./SelectProvince";
import { IoIosArrowForward } from "react-icons/io";
import ProvinceService from "../../services/ProvinceService";

export default function SelectAddress1({ formData, setFormData }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinceName, setProvinceName] = useState(null);
  useEffect(() => {
    const fetchProvinceName = async (provinceId) => {
      if (provinceId) {
        try {
          const res = await ProvinceService.get(provinceId);
          setProvinceName(res.data.name); 
        } catch (error) {
          console.error("Error fetching province name:", error);
        }
      } else {
        setProvinceName(null);
      }
    };
    fetchProvinceName(formData.provinceId);
  }, [formData.provinceId]); 

  const displayText = provinceName ? `${provinceName}`.trim() : "Chọn địa chỉ";

  useEffect(() => {
    setSelectedProvince(formData?.provinceId || "");
  }, [formData]);

  const handleConfirm = () => {
    setFormData({
      ...formData,
      provinceId: selectedProvince,
    });
    setOpenModal(false);
  };

  return (
    <div>
      <Button
        outline
        color="light"
        className="hover:border-black rounded-sm"
        onClick={() => setOpenModal(true)}
      >
        {displayText}
        <IoIosArrowForward className="mr-2 h-5 w-5" />
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Chọn địa chỉ</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <SelectProvince
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
            />
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
