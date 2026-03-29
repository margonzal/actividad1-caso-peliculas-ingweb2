import axios from "axios";

const API_URL = "https://caso-estudio-peliculas-ingweb2.onrender.com/api/productora";

export const getProductoras = () => axios.get(API_URL);

export const createProductora = (data) => axios.post(API_URL, data);

export const updateProductora = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteProductora = (id) => axios.delete(`${API_URL}/${id}`);