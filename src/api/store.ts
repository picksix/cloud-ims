/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { firestore } from '@/firebase';
import {
  addDoc, collection, doc, runTransaction, updateDoc,
} from 'firebase/firestore';

import { Product } from './types';

export const products = collection(firestore, 'products');

export function addProduct(p: Product) {
  return addDoc(products, p);
}

export function updateProduct(id: string, p: Product) {
  const d = doc(products, id);
  return updateDoc(d, p);
}

export function buyProduct(id: string, quantity: number) {
  const d = doc(products, id);
  return runTransaction(firestore, async (context) => {
    const product = await context.get(d);
    if (!product.exists()) return false;
    const data = product.data() as Product;
    const newQuantity = data.quantity - quantity;
    if (newQuantity < 0) return false;
    data.quantity = newQuantity;
    await context.update(d, data);
    return true;
  });
}
