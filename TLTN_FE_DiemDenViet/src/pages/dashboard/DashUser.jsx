import { useEffect, useState } from "react";
import { Label, Select, Table, TextInput } from "flowbite-react";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import UpdateUser from "../../components/user/UpdateUser";
import DeleteConfirmModal from "../../components/common/DeleteComfirmModel";
import { Pagination } from "@mui/material";
import UserService from "../../services/UserService";

export default function DashUser() {
  const [data, setData] = useState([]);
  const [updateUser, setUpdateUser] = useState("");
  const [deleteUserId, setDeleteUserId] = useState("");
  const pageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [username, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        pageSize,
        order: 1,
        ...(isAdmin && { isAdmin }),
        ...(username && { username }),
      }).toString();
      const res = await UserService.gets(queryParams);
      setData(res.data.data);
      setTotalPages(Math.ceil(res.data.total / pageSize));
    } catch (error) {
      console.log("Lỗi khi fetch dữ liệu:", error);
    }
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [isAdmin, username]);

  useEffect(() => {
    fetchData();
  }, [currentPage, isAdmin, username]);

  const handleDelete = async (id) => {
    try {
      await UserService.delete(id);
      setDeleteUserId(null);
      fetchData();
    } catch (error) {
      console.log("Lỗi khi xóa danh mục:", error);
    }
  };
  console.log(isAdmin);
  return (
    <div>
      <h1 className="text-2xl font-semibold py-4">QUẢN LÝ TÀI KHOẢN</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row gap-3">
          <div>
            <Label htmlFor="isAdmin" value="Quyền" />
            <TextInput
              id="name"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="isAdmin" value="Quyền" />
            <Select
              id="isAdmin"
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
              required
            >
              <option value={""}>--Tất cả--</option>
              <option value={true}>Quản trị</option>
              <option value={false}>Người dùng</option>
            </Select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Tên</Table.HeadCell>
            <Table.HeadCell>Tên đăng nhập</Table.HeadCell>
            <Table.HeadCell>Quyền</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
            <Table.HeadCell>Tùy chọn</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell>
                    {item.isAdmin ? "Quản trị" : "Người dùng"}
                  </Table.Cell>
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
                      onClick={() => setUpdateUser(item)}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-500 font-semibold hover:underline"
                      onClick={() => setDeleteUserId(item._id)}
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
      {updateUser && (
        <UpdateUser item={updateUser} onCLose={() => setUpdateUser(null)} />
      )}
      {deleteUserId && (
        <DeleteConfirmModal
          itemId={deleteUserId}
          handleDelete={handleDelete}
          onCLose={() => setDeleteUserId(null)}
        />
      )}
    </div>
  );
}
