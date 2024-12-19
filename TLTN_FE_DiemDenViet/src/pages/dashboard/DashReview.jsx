import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { Pagination } from "@mui/material";
import ReviewService from "../../services/ReviewService";
import DeleteConfirmModal from "../../components/common/DeleteComfirmModel";

export default function DashReview() {
  const [data, setData] = useState([]);
  const pageSize = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteReviewId, setDeleteReviewId] = useState("");

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        pageSize,
      }).toString();
      const res = await ReviewService.gets(queryParams);
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
      await ReviewService.delete(id);
      setDeleteReviewId(null);
      fetchData();
    } catch (error) {
      console.log("Lỗi khi xóa nhận xét:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold py-4">Quản lý nhận xét</h1>
      <div className="flex justify-between items-center mb-4">
        <div></div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Nội dung</Table.HeadCell>
            <Table.HeadCell>Tên đăng nhập</Table.HeadCell>
            <Table.HeadCell>Id điểm đến</Table.HeadCell>
            <Table.HeadCell>Tùy chọn</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.comment}</Table.Cell>
                  <Table.Cell>{item.userId}</Table.Cell>
                  <Table.Cell>{item.destinationId}</Table.Cell>
                  <Table.Cell>
                    {item.isDeleted ? (
                      <IoClose className="text-red-500" />
                    ) : (
                      <IoCheckmarkSharp className="text-green-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell className="inline-flex gap-3">
                    <button
                      className="text-red-500 font-semibold hover:underline"
                      onClick={() => setDeleteReviewId(item._id)}
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
      {deleteReviewId && (
        <DeleteConfirmModal
          itemId={deleteReviewId}
          handleDelete={handleDelete}
          onCLose={() => setDeleteReviewId(null)}
        />
      )}
    </div>
  );
}
