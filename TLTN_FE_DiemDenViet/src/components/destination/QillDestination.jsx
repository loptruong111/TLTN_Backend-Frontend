import { Button } from "flowbite-react";
import { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CommonService from "../../services/CommonService";

export default function QillDestination({ formData, setFormData }) {
  const quillRef = useRef(null);
  const toolbarOptions = [
    [
      { header: [1, 2, 3, 4, 5, 6, false] },
      { size: ["small", false, "large", "huge"] },
    ],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    ["link", "video"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ];
  const modules = {
    toolbar: toolbarOptions,
  };

  // Xử lý chèn ảnh vào ReactQuill
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files[0];
      try {
        const imageUrl = await CommonService.uploadImage(file);
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
    input.click();
  };

  return (
    <div className="relative">
      <ReactQuill
        theme="snow"
        placeholder="Write something..."
        required
        ref={quillRef}
        modules={modules}
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
      />
      {/* Nút tải ảnh ngoài Quill toolbar */}
      <Button
        onClick={handleImageUpload}
        color="light"
        className=" absolute right-0 bottom-0"
      >
        Chèn ảnh
      </Button>
    </div>
  );
}
