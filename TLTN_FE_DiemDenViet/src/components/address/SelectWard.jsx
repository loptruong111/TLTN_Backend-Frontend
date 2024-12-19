import { Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import WardService from "../../services/WardService";

export default function SelectWard({
  selectedDistrict,
  selectedWard,
  setSelectedWard,
}) {
  const [wards, setWards] = useState([]);

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
  return (
    <>
      <Label htmlFor="ward">Phường/Xã</Label>
      <Select
        id="ward"
        value={selectedWard || ""}
        onChange={(e) => setSelectedWard(e.target.value)}
        disabled={!selectedDistrict}
      >
        <option value="">Chọn Phường/Xã</option>
        {wards &&
          wards.length &&
          wards.map((ward) => (
            <option key={ward._id} value={ward._id}>
              {ward.name}
            </option>
          ))}
      </Select>
    </>
  );
}
