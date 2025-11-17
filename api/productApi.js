import axios from '../api/axiosSetup';
const API_URL = process.env.REACT_APP_API_URL;

export const fetchProducts = () => axios.get(`${API_URL}/products`);
export const createProduct = (product) => axios.post(`${API_URL}/products`, product);
export const updateProduct = (id, updatedProduct) => axios.put(`${API_URL}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);
