import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import SelectProvince from "./SelectProvince";
import SelectDistrict from "./SelectDistrict";
import { IoIosArrowForward } from "react-icons/io";
import ProvinceService from "../../services/ProvinceService";
import DistrictService from "../../services/DistrictService";

export default function SelectAddress2({ formData, setFormData }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [provinceName, setProvinceName] = useState(null);
  const [districtName, setDistrictName] = useState(null);
  useEffect(() => {
    const fetchProvinceName = async (provinceId) => {
      if (provinceId) {
        try {
          const res = await ProvinceService.get(provinceId);
          setProvinceName(res.data.name); // Giả sử API trả về { name: "Province Name" }
        } catch (error) {
          console.error("Error fetching province name:", error);
        }
      } else {
        setProvinceName(null);
      }
    };

    const fetchDistrictName = async (districtId) => {
      if (districtId) {
        try {
          const res = await DistrictService.get(districtId);
          setDistrictName(res.data.name);
        } catch (error) {
          console.error("Error fetching district name:", error);
        }
      } else {
        setDistrictName(null);
      }
    };

    fetchProvinceName(formData.provinceId);
    fetchDistrictName(formData.districtId);
  }, [formData.provinceId, formData.districtId]);

  const displayText =
    provinceName || districtName
      ? `${provinceName || ""} ${
          districtName ? `, ${districtName}` : ""
        }`.trim()
      : "Chọn địa chỉ";

  useEffect(() => {
    setSelectedProvince(formData?.provinceId || "");
    setSelectedDistrict(formData?.districtId || "");
  }, [formData]);

  const handleConfirm = () => {
    setFormData({
      ...formData,
      provinceId: selectedProvince,
      districtId: selectedDistrict,
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
            <SelectDistrict
              selectedProvince={selectedProvince}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
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
