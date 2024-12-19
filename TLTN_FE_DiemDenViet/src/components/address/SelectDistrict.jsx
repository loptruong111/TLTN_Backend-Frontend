import { Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import DistrictService from "../../services/DistrictService";

export default function SelectDistrict({
  selectedProvince,
  selectedDistrict,
  setSelectedDistrict,
}) {
  const [districts, setDistricts] = useState([]);

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

  return (
    <>
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
    </>
  );
}
