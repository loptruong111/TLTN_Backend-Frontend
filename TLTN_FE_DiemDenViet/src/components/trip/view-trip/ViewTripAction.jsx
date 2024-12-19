import { Button } from "flowbite-react";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmModal from "../../common/DeleteComfirmModel";
import { useNavigate } from "react-router-dom";
import TripService from "../../../services/TripService";

export default function ViewTripAction({ itemId }) {
  const navigate = useNavigate();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleDelete = async (itemId) => {
    try {
      const res = await TripService.delete(itemId);
      if (res.status) {
        navigate("/trip/mytrip");
      }
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
    }
  };
  const handleCopyLink = () => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        alert("Đã sao chép liên kết: ");
      })
      .catch((err) => {
        console.error("Lỗi khi sao chép liên kết: ", err);
      });
  };

  return (
    <div className="mt-7 flex justify-between">
      <Button className="bg-red-500" onClick={() => setOpenModalDelete(true)}>
        <RiDeleteBin6Line className="mr-2 h-5 w-5" />
        Xóa
      </Button>
      <Button
        className="bg-teal-500 hover:bg-teal-700"
        onClick={handleCopyLink}
      >
        Sao chép liên kết
      </Button>
      {openModalDelete && (
        <DeleteConfirmModal
          openModalDelete={openModalDelete}
          setOpenModalDelete={setOpenModalDelete}
          handleDelete={handleDelete}
          itemId={itemId}
        />
      )}
    </div>
  );
}
