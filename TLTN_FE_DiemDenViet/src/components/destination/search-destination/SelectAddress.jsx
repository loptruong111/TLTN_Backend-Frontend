import { Button, Label, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import ProvinceService from "../../../services/ProvinceService";
import DistrictService from "../../../services/DistrictService";
import WardService from "../../../services/WardService";

export default function SelectAddress({
  openModal,
  setOpenModal,
  filter,
  setFilter,
}) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    setSelectedProvince(filter?.provinceId || "");
    setSelectedDistrict(filter?.districtId || "");
    setSelectedWard(filter?.wardId || "");
  }, [filter]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await ProvinceService.getForSelect();
      if (res.status) {
        setProvinces(res.data.data);
      }
    };
    fetchProvinces();
  }, []);
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedProvince) return;
      const queryParams = new URLSearchParams({
        provinceId: selectedProvince,
      }).toString();
      const res = await DistrictService.getForSelect(queryParams);
      if (res.status) {
        setDistricts(res.data.data);
        setWards([]);
        setSelectedWard("");
      }
    };
    fetchDistricts();
  }, [selectedProvince]);
  useEffect(() => {
    const fetchWards = async () => {
      if (!selectedDistrict) return;
      const queryParams = new URLSearchParams({
        districtId: selectedDistrict,
      }).toString();
      const res = await WardService.getForSelect(queryParams);
      if (res.status) {
        setWards(res.data.data);
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  const handleConfirm = () => {
    setFilter({
      ...filter,
      provinceId: selectedProvince,
      districtId: selectedDistrict,
      wardId: selectedWard,
    });
    setOpenModal(false);
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Chọn địa chỉ</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          {/* Chọn Tỉnh/Thành phố */}
          <Label htmlFor="province">Tỉnh/Thành phố</Label>
          <Select
            id="province"
            value={selectedProvince || ""}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedDistrict("");
              setSelectedWard("");
            }}
          >
            <option value="">Chọn Tỉnh/Thành phố</option>
            {provinces.map((province) => (
              <option key={province._id} value={province._id}>
                {province.name}
              </option>
            ))}
          </Select>

          {/* Chọn Quận/Huyện */}
          <Label htmlFor="district">Quận/Huyện</Label>
          <Select
            id="district"
            value={selectedDistrict || ""}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedWard("");
            }}
            disabled={!selectedProvince}
          >
            <option value="">Chọn Quận/Huyện</option>
            {districts.map((district) => (
              <option key={district._id} value={district._id}>
                {district.name}
              </option>
            ))}
          </Select>

          {/* Chọn Phường/Xã */}
          <Label htmlFor="ward">Phường/Xã</Label>
          <Select
            id="ward"
            value={selectedWard || ""}
            onChange={(e) => setSelectedWard(e.target.value)}
            disabled={!selectedDistrict}       >
            <option value="">Chọn Phường/Xã</option>
            {wards.map((ward) => (
              <option key={ward._id} value={ward._id}>
                {ward.name}
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
  );
}
