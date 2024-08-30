import { useDispatch } from "react-redux";
import { setPicture } from "../redux/slices/pictureSlice";

export const useLoadPicture = () => {
  const dispatch = useDispatch();
  const handleLoadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0]; 
    if (!file) {
      alert("No file selected");
      return;
    }

    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert(`File size should be less than ${maxSizeMB}MB`);
      return;
    }

    const allowedExtensions = ["image/jpeg", "image/png"];
    if (!allowedExtensions.includes(file.type)) {
      alert("Invalid file type. Only JPG and PNG files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      dispatch(setPicture(base64String));
    };
    reader.readAsDataURL(file);
  };   
  return handleLoadPicture;
};