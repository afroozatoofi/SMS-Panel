import axios from "axios";
import Toast from "../components/toast";

let showMessage = true;

axios.interceptors.request.use(
  config => {
    config.baseURL = "/";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  success => {
    let spin = document.querySelector("#cover-spin");
    if (spin != null) {
      spin.style.display = "none";
    }
    if (success && success.status === 202) {
      if (success.data.exception) {
        Toast.showMessage(success.data.exception);
      } else {
        Toast.showMessage(success.data);
      }
    }
    return success;
  },
  error => {
    if (error && error.response && showMessage) {
      if ([500].includes(error.response.status)) {
        if (error.response.data && error.response.data.customMsg) {
          Toast.showMessage(error.response.data);
        } else {
          showMessage = false;
          Toast.showMessage({
            customMsg: "An error occurred on the server.",
            options: {
              onClose: () => {
                showMessage = true;
              }
            }
          });
        }
      }
      let spin = document.querySelector("#cover-spin");
      if (spin !== null) {
        spin.style.display = "none";
      }
    }
    return Promise.reject(
      error && error.response ? error.response.data : false
    );
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
