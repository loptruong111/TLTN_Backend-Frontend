import { useEffect, useState } from "react";
import DistrictService from "../../services/DistrictService";
import { Table } from "flowbite-react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import CreateDistrict from "../../components/district/CreateDistrict";
import UpdateDistrict from "../../components/district/UpdateDistrict";
import DeleteConfirmModal from "../../components/common/DeleteComfirmModel";
import SelectProvince from "../../components/address/SelectProvince";
import { Pagination } from "@mui/material";

export default function DashDistrict() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [data, setData] = useState([]);
  const [updateItem, setUpdateItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState("");
  const pageSize = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        provinceId: selectedProvince,
        page: currentPage,
        pageSize,
      }).toString();
      const res = await DistrictService.gets(queryParams);
      setData(res.data.data);
      setTotalPages(Math.ceil(res.data.total / pageSize));
    } catch (error) {
      console.log("Lỗi khi fetch dữ liệu:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await DistrictService.delete(id);
      setDeleteItemId(null);
      fetchData(selectedProvince);
    } catch (error) {
      console.log("Lỗi khi xóa:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProvince]);

  useEffect(() => {
    fetchData();
  }, [selectedProvince, currentPage]);

  return (
    <div>
      <h1 className="text-2xl font-semibold py-4">Quản lý Quận huyện</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <SelectProvince
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
          />
        </div>
        <CreateDistrict />
      </div>

      {/* Bảng hiển thị danh sách subcategories */}
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Tên</Table.HeadCell>
            <Table.HeadCell>Tỉnh thành</Table.HeadCell>
            <Table.HeadCell>Số điểm đến</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
            <Table.HeadCell>Tùy chọn</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.province.name}</Table.Cell>
                  <Table.Cell>{item.destinationCount}</Table.Cell>
                  <Table.Cell>
                    {item.isDeleted ? (
                      <IoClose className="text-red-500" />
                    ) : (
                      <IoCheckmarkSharp className="text-green-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell className="inline-flex gap-3">
                    <button
                      className="text-blue-500 font-semibold hover:underline"
                      onClick={() => setUpdateItem(item)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-500 font-semibold hover:underline"
                      onClick={() => setDeleteItemId(item._id)}
                    >
                      Xóa
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="5" className="text-center">
                  Không có dữ liệu phù hợp.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Pagination
          count={totalPages || 1}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)} 
          className="flex justify-center py-5"
          color="primary"
        />
      </div>

      {/* Modal cập nhật district */}
      {updateItem && (
        <UpdateDistrict item={updateItem} onCLose={() => setUpdateItem(null)} />
      )}

      {/* Modal xác nhận xóa district */}
      {deleteItemId && (
        <DeleteConfirmModal
          itemId={deleteItemId}
          handleDelete={handleDelete}
          onCLose={() => setDeleteItemId(null)}
        />
      )}
    </div>
  );
}
