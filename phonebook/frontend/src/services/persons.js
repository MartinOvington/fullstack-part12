import axios from 'axios';
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteId = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(() => true);
};

export default { getAll, create, update, deleteId };
