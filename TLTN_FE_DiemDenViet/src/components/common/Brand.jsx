import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <Link to={"/"} className="flex items-center">
      <img src="/icon.svg" width={35} height={35} alt="Logo" />
      <span className="text-lg font-bold">DiemDenViet</span>
    </Link>
  );
}
