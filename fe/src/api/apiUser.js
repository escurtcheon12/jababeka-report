import axios from "axios";

export async function loginUser(username, password) {
  return axios.post(`${process.env.REACT_APP_BACKEND_PORT}/api/auth/login`, {
    user_name: username,
    user_password: password,
  });
}

export async function registerUser(username, email, phone, password) {
  return axios.post(process.env.REACT_APP_BACKEND_PORT + "/api/user/add", {
    user_name: username,
    user_email: email,
    user_phone: phone,
    user_password: password,
  });
}
