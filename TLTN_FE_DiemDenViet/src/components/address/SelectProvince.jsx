import { Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import ProvinceService from "../../services/ProvinceService";

export default function SelectProvince({ selectedProvince, setSelectedProvince }) {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await ProvinceService.getForSelect();
      if (res.status) {
        setProvinces(res.data.data);
      }
    };
    fetchProvinces();
  }, []);

  return (
    <>
      <Label htmlFor="province">Tỉnh/Thành phố</Label>
      <Select
        id="province"
        value={selectedProvince || ""}
        onChange={(e) => setSelectedProvince(e.target.value)}
      >
        <option value="">Chọn Tỉnh/Thành phố</option>
        {provinces.map((province) => (
          <option key={province._id} value={province._id}>
            {province.name}
          </option>
        ))}
      </Select>
    </>
  );
}
