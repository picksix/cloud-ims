// import axios from 'axios';
import { db } from '@/firebase';
import { onValue, ref } from 'firebase/database';
import { Products } from './types';

const products = ref(db, 'products');

onValue(products, (snapshot) => {
  console.log(snapshot);
});

// axios.defaults.baseURL = "http://localhost:5000/api";
// db.collection('product').orderBy('timestamp').onSnapshot((querySnapshot: unknown[]) => {
//   // product.value=[]
//   querySnapshot.forEach((doc: unknown) => {
//     console.log('data!', doc);
//     // product.value.push(doc.data());
//   });
// });

// async function getProducts() {
//   console.log('fetching prodecuts');
//   return product.value
// }
// async function buyProduct(id, quantity) {
//   let timestamp = new Date().getTime()
//   console.log('buying, id, quantity);
//   if (product.quantity >= quantity) {
//       db.collection('product').doc(id).update({
//           quantity: fs.firestore.FieldValue.increment(quantity)
//       })
//       db.collection('order').doc(timestamp).set({
//           id: string,
//           quantity: quantity,
//       },{merge:true})
//   }
// };
// async function addProduct(id, quantity) {
//   db.collection('product').doc(id).update({
//       quantity: fs.firestore.FieldValue.increment(quantity)
//   })
// }

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
