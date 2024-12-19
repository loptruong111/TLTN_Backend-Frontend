import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function SelectTimeOpen({ formData, setFormData }) {
  const daysOfWeek = [
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    "Chủ nhật",
  ];
  const [openModal, setOpenModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("all");

   useEffect(() => {
    if (formData.openingTime.length === 0) {
      setFormData({
        ...formData,
        openingTime: daysOfWeek.map((day) => ({
          day,
          open: false,
          openAllDay: false,
          closedAllDay: false,
          startTime: "",
          endTime: "",
        })),
      });
    }
  }, [openModal, formData, setFormData]);

  const handleToggleDay = (index) => {
    const newOpeningHours = [...formData.openingTime];
    newOpeningHours[index].open = !newOpeningHours[index].open;
    setFormData({ ...formData, openingTime: newOpeningHours });
  };

  const handleTimeChange = (index, field, value) => {
    const newOpeningHours = [...formData.openingTime];
    newOpeningHours[index][field] = value;

    const { startTime, endTime } = newOpeningHours[index];
    if (field === "endTime" && startTime && value < startTime) {
      alert("Giờ đóng cửa phải sau giờ mở cửa");
      return;
    } else if (field === "startTime" && endTime && value > endTime) {
      alert("Giờ đóng cửa phải sau giờ mở cửa");
      return;
    }

    setFormData({ ...formData, openingTime: newOpeningHours });
  };

  const handleApplyToAllDays = () => {
    setSelectedGroup("all");
    const newOpeningHours = formData.openingTime.map((day) => ({
      ...day,
      open: true,
      openAllDay: false,
      closedAllDay: false,
      startTime: "08:00",
      endTime: "18:00",
    }));
    setFormData({ ...formData, openingTime: newOpeningHours });
  };

  const handleApplyToWeekdays = () => {
    setSelectedGroup("weekdays");
    const newOpeningHours = formData.openingTime.map((day, index) => {
      if (index < 5) {
        return {
          ...day,
          open: true,
          openAllDay: false,
          closedAllDay: false,
          startTime: "08:00",
          endTime: "17:00",
        };
      }
      return day;
    });
    setFormData({ ...formData, openingTime: newOpeningHours });
  };

  const handleApplyToWeekends = () => {
    setSelectedGroup("weekends");
    const newOpeningHours = formData.openingTime.map((day, index) => {
      if (index >= 5) {
        return {
          ...day,
          open: true,
          openAllDay: false,
          closedAllDay: false,
          startTime: "10:00",
          endTime: "16:00",
        };
      }
      return day;
    });
    setFormData({ ...formData, openingTime: newOpeningHours });
  };

  const handleToggleOpenAllDay = (index) => {
    const newOpeningHours = [...formData.openingTime];
    newOpeningHours[index].openAllDay = !newOpeningHours[index].openAllDay;
    newOpeningHours[index].closedAllDay = false;
    if (newOpeningHours[index].openAllDay) {
      newOpeningHours[index].startTime = "00:00";
      newOpeningHours[index].endTime = "23:59";
    } else {
      newOpeningHours[index].startTime = "";
      newOpeningHours[index].endTime = "";
    }
    setFormData({ ...formData, openingTime: newOpeningHours });
  };

  const handleToggleClosedAllDay = (index) => {
    const newOpeningHours = [...formData.openingTime];
    newOpeningHours[index].closedAllDay = !newOpeningHours[index].closedAllDay;
    newOpeningHours[index].openAllDay = false;
    newOpeningHours[index].open = !newOpeningHours[index].closedAllDay;
    if (newOpeningHours[index].closedAllDay) {
      newOpeningHours[index].startTime = "";
      newOpeningHours[index].endTime = "";
    }
    setFormData({ ...formData, openingTime: newOpeningHours });
  };

  return (
    <div>
      <Button color="light" onClick={() => setOpenModal(true)}>
        Chọn giờ hoạt động
        <HiOutlineArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Giờ hoạt động</Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex gap-2 mb-4">
              <Button onClick={handleApplyToAllDays}>
                Chỉnh sửa tất cả các ngày
              </Button>
              <Button onClick={handleApplyToWeekdays}>Chỉnh sửa T2 - T6</Button>
              <Button onClick={handleApplyToWeekends}>Chỉnh sửa T7 - CN</Button>
            </div>
            {formData.openingTime.map((day, index) => (
              <div key={index} style={{ marginBottom: "1em" }}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={day.open}
                    onChange={() => handleToggleDay(index)}
                    className="mr-2"
                  />
                  {day.day}
                </label>
                {day.open && (
                  <div className="ml-4">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={day.openAllDay}
                        onChange={() => handleToggleOpenAllDay(index)}
                        className="mr-2"
                      />
                      <span>Mở cửa cả ngày</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={day.closedAllDay}
                        onChange={() => handleToggleClosedAllDay(index)}
                        className="mr-2"
                      />
                      <span>Đóng cửa cả ngày</span>
                    </div>
                    {!day.closedAllDay && !day.openAllDay && (
                      <>
                        <label>
                          Open:
                          <input
                            type="time"
                            value={day.startTime}
                            onChange={(e) =>
                              handleTimeChange(
                                index,
                                "startTime",
                                e.target.value
                              )
                            }
                          />
                        </label>
                        <label>
                          Close:
                          <input
                            type="time"
                            value={day.endTime}
                            onChange={(e) =>
                              handleTimeChange(index, "endTime", e.target.value)
                            }
                          />
                        </label>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Hủy
          </Button>
          <Button onClick={() => setOpenModal(false)}>Đồng ý</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
