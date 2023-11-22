import axios from "axios";

export async function loginUser(username, password) {
  return axios.post(process.env.REACT_APP_BACKEND_PORT + "/api/auth/login", {
    username,
    password,
  });
}

export async function registerUser(
  username,
  email,
  phone,
  repeat_password,
  password
) {
  return axios.post(process.env.REACT_APP_BACKEND_PORT + "/api/auth/register", {
    username,
    email,
    phone,
    password,
    repeat_password,
  });
}
