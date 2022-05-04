export type Product = {
  name: string;
  image: string;
  price: number;
  quantity: number;
  description: string;
};

export type MaybeProduct = Product & {
  id?: string
}

export type ProductInstance = Product & {
  id: string;
}

export type Products = ProductInstance[];
