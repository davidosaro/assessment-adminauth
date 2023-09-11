import { toast } from "react-toastify";

export default function Notify(message: string, type = "info") {
  if (type == "error") {
    return toast.error(message, {
      position: "top-right",
      autoClose: 750,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }
  if (type == "success") {
    return toast.success(message, {
      position: "top-right",
      autoClose: 750,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }
  return toast.info(message, {
    position: "top-right",
    autoClose: 750,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    });
}