import axios from 'axios';

// TODO: put cloud functions
// axios.defaults.baseURL = "http://localhost:5000/api";

export const getProducts = () => axios.get('/api/products');

export const buyProduct = (id, quantity) => {

};
