import axios from "axios";

const API = "http://localhost:4000/api/media";

export const getMedias = () => axios.get(API);

export const createMedia = (data) => axios.post(API, data);

export const updateMedia = (id, data) => axios.put(`${API}/${id}`, data);

export const deleteMedia = (id) => axios.delete(`${API}/${id}`);