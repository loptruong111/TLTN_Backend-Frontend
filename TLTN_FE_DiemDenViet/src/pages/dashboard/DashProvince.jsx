import { useEffect, useState } from "react";
import ProvinceService from "../../services/ProvinceService";
import { Table } from "flowbite-react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import CreateProvince from "../../components/province/CreateProvince";
import UpdateProvince from "../../components/province/UpdateProvince";
import DeleteConfirmModal from "../../components/common/DeleteComfirmModel";
import { Pagination } from "@mui/material";

export default function DashProvince() {
  const [data, setData] = useState([]);
  const [updateItem, setUpdateItem] = useState("");
  const [deleteItemId, setDeleteItemId] = useState("");
  const pageSize = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        pageSize,
      }).toString();
      const res = await ProvinceService.gets(queryParams);
      setData(res.data.data);
      setTotalPages(Math.ceil(res.data.total / pageSize));
    } catch (error) {
      console.log("Lỗi khi fetch dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await ProvinceService.delete(id);
      setDeleteItemId(null);
      fetchData();
    } catch (error) {
      console.log("Lỗi khi xóa:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold py-4">Quản lý Tỉnh thành</h1>
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <CreateProvince />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Tên</Table.HeadCell>
            <Table.HeadCell>Số quận huyện</Table.HeadCell>
            <Table.HeadCell>Số điển đến</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
            <Table.HeadCell>Tùy chọn</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.districtCount}</Table.Cell>
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
                <Table.Cell colSpan="4" className="text-center">
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
      {updateItem && (
        <UpdateProvince item={updateItem} onCLose={() => setUpdateItem(null)} />
      )}
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
