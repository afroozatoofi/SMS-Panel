import { toast } from "react-toastify";
import Storage from "./storage";

class Toast {
  static showMessage({ customMsg, type = 1, options }) {
    this.dismiss();
    let toastId = 0;
    switch (type) {
      case 1:
        toastId = toast.error(customMsg, options);
        break;
      case 2:
        toastId = toast.info(customMsg, options);
        break;
      case 3:
        toastId = toast.warn(customMsg, options);
        break;
      case 4:
        toastId = toast.success(customMsg, options);
        break;
      case 5: // Lock
        toastId = toast.error(customMsg, options);
        Storage.setItem("lock", true);
        break;
      case undefined:
        toastId = toast.error("خطا در اجرای عملیات");
        break;
      default:
        toastId = toast.error(customMsg, options);
    }
    return toastId;
  }

  static dismiss() {
    toast.dismiss();
  }
}

export default Toast;
