import http from "./http.service";
import moment from "moment-jalaali";

export function login(username, password) {
  // return http.post("login", { username, password, role });
  return Promise.resolve({
    id: 1,
    user: "admin",
    expiration: moment().add(60, 'minutes'),
    token: "JFKLDJFKJSDFJSKFD"
  });
}

export function changePassword(username, passwordOld, passwordNew) {
  return http.post("change-pass", { username, passwordOld, passwordNew });
}

export function changeUserPassword(passwordOld, passwordNew) {
  return http.post("common/user/change-pass", { passwordOld, passwordNew });
}

export function getUser(role) {
  return http.get("common/currentuser/" + role);
}

export function logout() {
  return http.get("logout");
}
