import axios from "axios";

export async function listDataComment() {
  return axios.get(`${process.env.REACT_APP_BACKEND_PORT}/web/comment/list`);
}

export async function deleteDataComment(id) {
  return axios.get(
    process.env.REACT_APP_BACKEND_PORT + "/web/comment/delete/" + id
  );
}

export async function createDataComment(message, rating = 0, post_id, name) {
  return axios.post(
    process.env.REACT_APP_BACKEND_PORT + "/web/comment/create",
    {
      name,
      message,
      rating,
      post_id,
    }
  );
}

export async function updateRatingComment(id, text, rating = 0) {
  return axios.post(
    process.env.REACT_APP_BACKEND_PORT + "/web/comment/update",
    {
      id,
      message: text,
      rating,
    }
  );
}
