import { Bounce, toast } from "react-toastify";

export const errorNotify = (field: string, message: string | undefined) => {
  toast.error(`${message}`, {
    position: "top-right",
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Bounce,
  });
};