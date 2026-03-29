import axios from "axios";

const API_URL = "https://caso-estudio-peliculas-ingweb2.onrender.com/api/generos";

export const getGeneros = () => axios.get(API_URL);

export const createGenero = (data) => axios.post(API_URL, data);

export const updateGenero = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteGenero = (id) => axios.delete(`${API_URL}/${id}`);