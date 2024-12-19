import { useEffect, useState } from "react";
import SubcategoryService from "../../services/SubcategoryService";
import CategoryService from "../../services/CategoryService";
import { Table } from "flowbite-react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import CreateSubcategory from "../../components/subcategory/CreateSubcategory";
import UpdateSubcategory from "../../components/subcategory/UpdateSubcategory";
import DeleteConfirmModal from "../../components/common/DeleteComfirmModel";
import { Pagination } from "@mui/material";

export default function DashSubcategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);
  const [updateSubcategory, setUpdateSubcategory] = useState(null);
  const [deleteSubcategoryId, setDeleteSubcategoryId] = useState("");
  const pageSize = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async () => {
    try {
      const res = await CategoryService.getForSelect();
      setCategories(res.data.data);
    } catch (error) {
      console.log("Lỗi khi fetch danh mục chính:", error);
    }
  };

  const fetchData = async (categoryId) => {
    try {
      const queryParams = new URLSearchParams({
        categoryId: selectedCategory,
        page: currentPage,
        pageSize,
      }).toString();
      const res = await SubcategoryService.gets(queryParams);
      setData(res.data.data);
      setTotalPages(Math.ceil(res.data.total / pageSize));
    } catch (error) {
      console.log("Lỗi khi fetch dữ liệu:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await SubcategoryService.delete(id);
      setDeleteSubcategoryId(null);
      fetchData();
    } catch (error) {
      console.log("Lỗi khi xóa danh mục:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);
  useEffect(() => {
    fetchData();
  }, [selectedCategory, currentPage]);

  return (
    <div>
      <h1 className="text-2xl font-semibold py-4">Quản lý Danh mục phụ</h1>
      <div className="flex justify-between items-center mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <CreateSubcategory />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Tên</Table.HeadCell>
            <Table.HeadCell>Danh mục chính</Table.HeadCell>
            <Table.HeadCell>Số điểm đến</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
            <Table.HeadCell>Tùy chọn</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.category.name}</Table.Cell>
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
                      onClick={() => setUpdateSubcategory(item)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-500 font-semibold hover:underline"
                      onClick={() => setDeleteSubcategoryId(item._id)}
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
        </Table>{" "}
        <Pagination
          count={totalPages || 1}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          className="flex justify-center py-5"
          color="primary"
        />
      </div>

      {updateSubcategory && (
        <UpdateSubcategory
          item={updateSubcategory}
          onCLose={() => setUpdateSubcategory(null)}
        />
      )}

      {deleteSubcategoryId && (
        <DeleteConfirmModal
          itemId={deleteSubcategoryId}
          handleDelete={handleDelete}
          onCLose={() => setDeleteSubcategoryId(null)}
        />
      )}
    </div>
  );
}
