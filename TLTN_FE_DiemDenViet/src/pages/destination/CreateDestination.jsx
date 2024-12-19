import { TextField } from "@mui/material";
import { Alert, Button } from "flowbite-react";
import { useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import SelectCategory from "../../components/destination/search-destination/SelectCategory";
import UploadImage from "../../components/destination/create-destination/UploadImage";
import SelectAddress from "../../components/destination/create-destination/SelectAddress";
import NotificationModal from "../../components/common/NotificationModal";
import QillDestination from "../../components/destination/QillDestination";
import DestinationService from "../../services/DestinationService";
import SelectTimeOpen from "../../components/destination/SelectTimeOpen";

export default function CreateDestination() {
  const [formData, setFormData] = useState({
    name: "",
    address: {},
    category: {},
    image: "",
    openingTime: [],
    description: "",
  });
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [publishErorr, setPublishErorr] = useState(null);
  const [notification, setNotification] = useState(null);
  const [navigateURL, setNavigateURL] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await DestinationService.post(formData);
      if (!res.status) {
        setPublishErorr(data.message);
        return;
      }
      if (res.status) {
        setPublishErorr(null);
        setNavigateURL(`/destination/${res.data._id}`);
        setNotification(`Tạo thành công điểm đến ${res.data.name}`);
      }
    } catch (error) {
      setPublishErorr(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3">
      <h1 className="text-4xl font-semibold text-center pt-2 pb-8">
        TẠO MỚI ĐIỂM ĐẾN
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <TextField
            id="name"
            label="Tên điểm đến"
            variant="outlined"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div className="w-full grid grid-cols-2 gap-3">
            <TextField
              id="ticketPrice"
              label="Giá vé"
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, ticketPrice: e.target.value })
              }
            />
            <SelectTimeOpen formData={formData} setFormData={setFormData} />
          </div>
          <Button color="light" onClick={() => setOpenModalAddress(true)}>
            Chọn địa chỉ
            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <SelectCategory formData={formData} setFormData={setFormData} />
        </div>
        <UploadImage formData={formData} setFormData={setFormData} />
        <QillDestination formData={formData} setFormData={setFormData} />

        {publishErorr && <Alert color="failure">{publishErorr}</Alert>}
        <Button type="submit" gradientDuoTone="greenToBlue">
          Tạo mới điểm đến
        </Button>
      </form>
      <SelectAddress
        openModal={openModalAddress}
        setOpenModal={setOpenModalAddress}
        formData={formData}
        setFormData={setFormData}
      />
      {notification && (
        <NotificationModal
          notification={notification}
          navigateTo={navigateURL}
        />
      )}
    </div>
  );
}
