import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import SelectProvince from "./SelectProvince";
import SelectDistrict from "./SelectDistrict";
import SelectWard from "./SelectWard";
import { IoIosArrowForward } from "react-icons/io";
import WardService from "../../services/WardService";
import ProvinceService from "../../services/ProvinceService";
import DistrictService from "../../services/DistrictService";

export default function SelectAddress3({ formData, setFormData }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

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

    const fetchDistrictName = async (districtId) => {
      if (districtId) {
        try {
          const res = await DistrictService.get(districtId);
          setWardName(res.data.name);
        } catch (error) {
          console.error("Error fetching district name:", error);
        }
      } else {
        setDistrictName(null);
      }
    };

    const fetchWardName = async (wardId) => {
      if (wardId) {
        try {
          const res = await WardService.get(wardId);
          setDistrictName(res.data.name);
        } catch (error) {
          console.error("Error fetching ward name:", error);
        }
      } else {
        setDistrictName(null);
      }
    };

    fetchProvinceName(formData?.provinceId);
    fetchDistrictName(formData?.districtId);
    fetchWardName(formData?.wardId);
  }, [formData?.provinceId, formData?.districtId, formData?.wardId]);

  useEffect(() => {
    setSelectedProvince(formData?.provinceId || "");
    setSelectedDistrict(formData?.districtId || "");
    setSelectedWard(formData?.wardId || "");
    if (!selectedProvince) setProvinceName("");
    if (!selectedDistrict) setProvinceName("");
    if (!setSelectedWard) setWardName("");
  }, [formData]);

  const handleConfirm = () => {
    setFormData({
      ...formData,
      provinceId: selectedProvince,
      districtId: selectedDistrict,
      wardId: selectedWard,
    });
    setOpenModal(false);
  };
  const displayText =
    provinceName || districtName || wardName
      ? `${provinceName || ""}${districtName ? `, ${districtName}` : ""}${
          wardName ? `, ${wardName}` : ""
        }`.trim()
      : "Chọn địa chỉ";
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
            <SelectWard
              selectedDistrict={selectedDistrict}
              selectedWard={selectedWard}
              setSelectedWard={setSelectedWard}
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
