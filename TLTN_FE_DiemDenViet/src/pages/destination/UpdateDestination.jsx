import { TextField } from "@mui/material";
import { Alert, Button, Select } from "flowbite-react";
import { useEffect, useState, useCallback } from "react";
import SelectCategory from "../../components/destination/search-destination/SelectCategory";
import UploadImage from "../../components/destination/create-destination/UploadImage";
import SelectAddress4 from "../../components/address/SelectAddress4";
import { useNavigate, useParams } from "react-router-dom";
import NotificationModal from "../../components/common/NotificationModal";
import DestinationService from "../../services/DestinationService";
import QillDestination from "../../components/destination/QillDestination";
import SelectTimeOpen from "../../components/destination/SelectTimeOpen";

export default function UpdateDestination() {
  const navigate = useNavigate();
  const { destinationId } = useParams();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    address: {},
    category: {},
    image: "",
    openingTime: [],
    description: "",
    ticketPrice: "",
  });

  const [publishError, setPublishError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [navigateURL, setNavigateURL] = useState(null);

  const fetchDestination = async () => {
    try {
      const res = await DestinationService.getForUpdate(destinationId);
      const data = res.data;
      if (res.status) {
        setPublishError(null);
        setFormData((prevData) => ({
          ...prevData,
          name: data.name || "",
          address: data.address || {},
          category: {
            categoryId: data.category.categoryId || "",
            subcategoryId: data.category.subcategoryId || "",
          },
          image: data.image || "",
          openingTime: data.openingTime || [],
          description: data.description || "",
          ticketPrice: data.ticketPrice || "",
        }));
        setLoading(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, [destinationId]);

  const handleFormDataChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await DestinationService.put(destinationId, formData);
      if (!res.status) {
        setPublishError(data.message);
        return;
      }
      if (res.status) {
        setPublishError(null);
        setNavigateURL(`/destination/${res.data._id}`);
        setNotification(`Cập nhật thành công điểm đến ${res.data.name}`);
      }
    } catch (error) {
      setPublishError(error.message);
    }
  };

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="max-w-4xl mx-auto p-3">
      <h1 className=" text-4xl font-semibold text-center pt-2 pb-8">
        CHỈNH SỬA ĐIỂM ĐẾN
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <TextField
            id="name"
            label="Tên điểm đến"
            variant="outlined"
            value={formData.name}
            onChange={(e) => handleFormDataChange("name", e.target.value)}
          />
          <div className="w-full grid grid-cols-2 gap-3">
            <TextField
              id="ticketPrice"
              label="Giá vé"
              variant="outlined"
              value={formData.ticketPrice}
              onChange={(e) =>
                handleFormDataChange("ticketPrice", e.target.value)
              }
            />
            <SelectTimeOpen formData={formData} setFormData={setFormData} />
          </div>
          <SelectAddress4 formData={formData} setFormData={setFormData} />
          <SelectCategory formData={formData} setFormData={setFormData} />
        </div>
        <UploadImage formData={formData} setFormData={setFormData} />
        <QillDestination formData={formData} setFormData={setFormData} />
        <Select
          id="isDeleted"
          value={formData.isDeleted}
          onChange={(e) =>
            setFormData({ ...formData, isDeleted: e.target.value })
          }
          required
        >
          <option value={true}>Khóa</option>
          <option value={false}>Không khóa</option>
        </Select>
        {publishError && <Alert color="failure">{publishError}</Alert>}
        <Button type="submit" gradientDuoTone="greenToBlue">
          Cập nhật
        </Button>
      </form>

      {notification && (
        <NotificationModal
          notification={notification}
          navigateTo={navigateURL}
        />
      )}
    </div>
  );
}
