// import axios from 'axios';
import { Products } from './types';

// TODO: put cloud functions
// axios.defaults.baseURL = "http://localhost:5000/api";

export const getProducts = (): Products => {
  // axios.get('/api/products');
  // TODO: fetch
  console.log('fetching products');
  return [
    {
      name: 'Smiley face',
      price: 1,
      quantity: 10,
      description: 'A smiley face',
      image: 'https://clipartmag.com/images/transparent-smiley-face-10.png',
      id: 'asd123',
    },
    {
      name: 'Frown',
      price: 2,
      quantity: 0,
      description: 'A frown',
      image: 'https://img.icons8.com/emoji/452/frowning-face.png',
      id: '122223',
    },
  ];
};

export const buyProduct = (id: string, quantity: number): void => {
  console.log('buying', id, quantity);
};
