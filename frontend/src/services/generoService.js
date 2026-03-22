import axios from "axios";

const API_URL = "http://localhost:4000/api/genero";

export const getGeneros = () => axios.get(API_URL);

export const createGenero = (data) => axios.post(API_URL, data);

export const updateGenero = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteGenero = (id) => axios.delete(`${API_URL}/${id}`);