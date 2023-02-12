export interface Order {
  id: string;
  userId: string;
  productId: string;
  status: string;
  qunatity: string;
}

export interface OrderInput {
  userId: string;
  productId: string;
  quantity: string;
}

export interface OrderProduct {
  id: string;
  userId: string;
  status: string;
  products: {
    id: string;
    name: string;
    price: string;
    quantity: string;
  };
}
