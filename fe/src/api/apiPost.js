import axios from "axios";

export async function listPostData(category, user_id) {
  return axios.get(
    `${process.env.REACT_APP_BACKEND_PORT}/web/post/list?category=${category}&user_id=${user_id}`
  );
}

export async function changePostStatus(id, status = "Waiting") {
  return axios.put(
    process.env.REACT_APP_BACKEND_PORT + "/api/post/changeStatus/" + id,
    {
      post_status: status,
    }
  );
}

export async function updatePostData(
  author,
  category,
  header,
  location,
  status,
  user_id,
  id
) {
  let data = {
    id,
  };

  if (author) data.author = author;
  if (category) data.category = category;
  if (header) data.header = header;
  if (location) data.location = location;
  if (status) data.status = status;
  if (user_id) data.user_id = user_id;

  return axios.post(
    process.env.REACT_APP_BACKEND_PORT + "/web/post/update/",
    data
  );
}
