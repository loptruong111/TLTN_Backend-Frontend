import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { app } from "../../../utils/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Alert } from "flowbite-react";

export default function UploadImage({ formData, setFormData }) {
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      handleUploadImage(file);
    } else {
      setImageFileUploadError("Invalid file type. Please upload an image.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleUploadImage = async (file) => {
    try {
      setImageFileUploadError(null);
      setImageFileUploadProgress(null);
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("Upload Image Failed");
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFormData({ ...formData, image: downloadUrl });
            setImageFileUploadProgress(null);
            setImageFileUploadError(null);
          });
        }
      );
    } catch (error) {
      setImageFileUploadError(error.message);
    }
  };

  return (
    <>
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center border-2 border-dashed border-teal-500 p-4 cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-teal-500">
          Drag and drop an image here, or click to select one
        </p>
        {imageFileUploadProgress && (
          <CircularProgressbar
            value={imageFileUploadProgress}
            text={`${imageFileUploadProgress || 0}%`}
            className="w-16 h-16 mt-2"
          />
        )}
      </div>
      {imageFileUploadError && (
        <Alert color="failure" className="mt-2">
          {imageFileUploadError}
        </Alert>
      )}
      {formData.image && (
        <img
          src={formData.image}
          alt="Uploaded"
          className="w-full h-60 object-cover "
        />
      )}
    </>
  );
}
