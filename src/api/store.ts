/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { firestore } from '@/firebase';
import {
  addDoc, collection, deleteDoc, doc, runTransaction, updateDoc,
} from 'firebase/firestore';

import { Product } from './types';

export const products = collection(firestore, 'products');

export const orders = collection(firestore, 'orders');

export function addProduct(p: Product) {
  return addDoc(products, p);
}

export function updateProduct(id: string, p: Product) {
  const d = doc(products, id);
  return updateDoc(d, p);
}

export function deleteProduct(id: string) {
  const d = doc(products, id);
  return deleteDoc(d);
}

export type Order = {
  id: string;
  quantity: number;
  name: string;
  cc: string;
}

export function buyProduct(order: Order) {
  const d = doc(products, order.id);
  return runTransaction(firestore, async (context) => {
    const product = await context.get(d);
    if (!product.exists()) return false;
    const data = product.data() as Product;
    const newQuantity = data.quantity - order.quantity;
    if (newQuantity < 0) return false;
    data.quantity = newQuantity;
    await context.update(d, data);
    addDoc(orders, {
      product: data.name,
      time: new Date(),
      order,
    });
    return true;
  });
}

export function deleteOrder(id: string) {
  const d = doc(orders, id);
  return deleteDoc(d);
}
