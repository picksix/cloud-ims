/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { firestore } from '@/firebase';
import {
  addDoc, collection, doc, updateDoc,
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
  console.log('buying', id, quantity);
}
