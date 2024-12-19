import { Button, Label, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import envVar from "../../../utils/envVar";
import { HiOutlineArrowRight } from "react-icons/hi";
import ProvinceService from "../../../services/ProvinceService";
import DistrictService from "../../../services/DistrictService";

export default function SelectAddress({ data, setData }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setSelectedProvince(data?.provinceId || "");
    setSelectedDistrict(data?.districtId || "");
  }, []);

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
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  const handleConfirm = () => {
    const provinceName =
      provinces.find((prov) => prov._id === selectedProvince)?.name || "";
    const districtName =
      districts.find((dist) => dist._id === selectedDistrict)?.name || "";

    setData({
      ...data,
      location: districtName
        ? `${districtName}, ${provinceName}`
        : provinceName,
    });
    setOpenModal(false);
  };

  return (
    <div>
      <Button color="light" onClick={() => setOpenModal(true)}>
        {data?.location || "Chọn địa chỉ"}
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
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
              }}
            >
              <option value="">Chọn Tỉnh/Thành phố</option>
              {provinces.map((province) => (
                <option key={province._id} value={province._id}>
                  {province.name}
                </option>
              ))}
            </Select>
            <Label htmlFor="district">Quận/Huyện</Label>
            <Select
              id="district"
              value={selectedDistrict || ""}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedProvince}
            >
              <option value="">Chọn Quận/Huyện</option>
              {districts.map((district) => (
                <option key={district._id} value={district._id}>
                  {district.name}
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
