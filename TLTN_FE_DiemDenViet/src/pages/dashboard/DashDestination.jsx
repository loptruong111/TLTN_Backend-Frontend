import { Button, Label, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import DestinationService from "../../services/DestinationService";
import SelectAddress3 from "../../components/address/SelectAddress3";
import SelectCategory from "../../components/destination/search-destination/SelectCategory";
import DeleteConfirmModal from "../../components/common/DeleteComfirmModel";
import { Pagination } from "@mui/material";

export default function DashDestination() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const pageSize = 25;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteItemId, setDeleteItemId] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    fetchData();
  }, [currentPage, filter]);

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        categoryId: filter?.category?.categoryId || "",
        subcategoryId: filter?.category?.subcategoryId || "",
        provinceId: filter?.provinceId || "",
        districtId: filter?.districtId || "",
        wardId: filter?.wardId || "",
        page: currentPage,
        pageSize,
      }).toString();
      const res = await DestinationService.gets(queryParams);
      setData(res.data.data);
      setTotalPages(Math.ceil(res.data.total / pageSize));
    } catch (error) {
      console.log("Lỗi khi fetch dữ liệu:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await DestinationService.delete(id);
      setDeleteItemId(null);
      fetchData();
    } catch (error) {
      console.log("Lỗi khi xóa:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold py-4">Quản lý loại điểm đến</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-wrap gap-3">
          <div>
            <Label>Địa chỉ</Label>
            <SelectAddress3 formData={filter} setFormData={setFilter} />
          </div>
          <div>
            <Label>Loại</Label>
            <SelectCategory formData={filter} setFormData={setFilter} />
          </div>
        </div>
        <Link to="/destination/create">
          <Button>Tạo mới</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Tên</Table.HeadCell>
            <Table.HeadCell>Giới thiệu</Table.HeadCell>
            <Table.HeadCell>Lượt xem</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
            <Table.HeadCell>Tùy chọn</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <Table.Row key={index} className="justify-self-center">
                  <Table.Cell>
                    <Link
                      to={`/destination/${item._id}`}
                      className="hover:text-blue-400"
                    >
                      {item.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={item.image}
                      alt="image"
                      className="aspect-video object-cover  h-16  min-w-16"
                    />
                  </Table.Cell>
                  <Table.Cell>{item.views}</Table.Cell>
                  <Table.Cell>
                    {item.isDeleted ? (
                      <IoClose className="text-red-500" />
                    ) : (
                      <IoCheckmarkSharp className="text-green-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell className="inline-flex gap-3">
                    <Link
                      className="text-blue-500 font-semibold hover:underline"
                      to={`/destination/${item._id}/update`}
                    >
                      Sửa
                    </Link>
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
      {deleteItemId && (
        <DeleteConfirmModal
          itemId={deleteItemId}
          handleDelete={handleDelete}
          onCLose={() => setDeleteItemId(null)}
          Close
          modal
          after
          delete
        />
      )}
    </div>
  );
}
