import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import envVar from "../utils/envVar";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { app } from "../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState({
    avatar: user?.avatar,
    name: user?.name || "",
    username: user?.username || "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUpLoadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setMessage("");
      const res = await fetch(`${envVar.api_url}/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(editUser.avatar && { avatar: editUser.avatar }),
          ...(editUser.name && { name: editUser.name }),
          ...(editUser.username && { username: editUser.username }),
          ...(editUser.password && { password: editUser.password }),
        }),
        credentials: "include",
      });

      if (res.status) {
        setMessage("Thay đổi thành công.");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Thay đổi thất bại");
    }

    setEditMode(false);
    setOpenModal(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  const uploadImage = () => {
    try {
      setImageFileUploading(true);
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const upLoadTask = uploadBytesResumable(storageRef, imageFile);

      upLoadTask.on(
        "state_changed",
        (snapShot) => {
          const progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("Could not upload image.");
          setImageFile(null);
          setImageFileUrl(null);
          setImageFileUploadProgress(null);
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(upLoadTask.snapshot.ref).then((downloadUrl) => {
            setImageFileUrl(downloadUrl);
            setEditUser((prev) => ({ ...prev, avatar: downloadUrl }));
            setImageFileUploading(false);
          });
        }
      );
    } catch (error) {
      console.log(error.message);
      setImageFileUploadError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <div>
          {editMode ? (
            <div className="flex flex-col items-center gap-6">
              <div
                onClick={() => filePickerRef.current.click()}
                className="relative self-center w-32 h-32 cursor-pointer shadow-md rounded-full"
              >
                {imageFileUpLoadProgress && (
                  <CircularProgressbar
                    className="absolute w-full h-full"
                    strokeWidth="4"
                    styles={buildStyles({
                      pathColor: "#00bcfc",
                    })}
                    value={imageFileUpLoadProgress}
                    maxValue={100}
                    text={`${imageFileUpLoadProgress}%`}
                  />
                )}
                <img
                  className={`w-full h-full rounded-full border-8 border-[lightgray] ${
                    imageFileUpLoadProgress &&
                    imageFileUpLoadProgress < 100 &&
                    "opacity-60"
                  }`}
                  src={imageFileUrl || user.avatar}
                  alt="avatar"
                />
                <input
                  ref={filePickerRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <TextField
                  label="Tên"
                  name="name"
                  value={editUser.name}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Tên đăng nhập"
                  name="username"
                  value={editUser.username}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Mật khẩu mới"
                  name="password"
                  type="password"
                  value={editUser.password}
                  onChange={handleInputChange}
                />
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={handleSave}
                >
                  Lưu
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <div className="relative self-center w-32 h-32 cursor-pointer shadow-md rounded-full">
                <img
                  className="w-full h-full rounded-full border-8 border-[lightgray]"
                  src={user.avatar}
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col text-center">
                <span className="font-bold text-lg">{user?.name}</span>
                <span className="text-gray-600">@{user?.username}</span>
              </div>
              <button
                className="mt-5 bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={handleEditToggle}
              >
                Thay đổi thông tin
              </button>
            </div>
          )}
        </div>
        <Modal
          show={openModal}
          size="md"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message}
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => window.location.reload()}
                >
                  OK
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
