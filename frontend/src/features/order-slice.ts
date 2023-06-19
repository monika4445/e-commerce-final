import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';

interface Image {
  fileName: string;
}

export interface Product {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  Image: Image;
}

interface Order {
  cartId: number;
  total: number;
  products: Product[];
}

interface Param {
  token: string;
  cartId: number;
  products: Product[];
}

interface PaymentState {
  status: string;
  clientSecret: string;
  orders: Order[];
  order: Order;
  error: string | null;
}

const initialState: PaymentState = {
  status: 'idle',
  clientSecret: '',
  orders: [],
  order: {} as Order,
  error: null,
};

export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async ({ token, cartId, products }: Param) => {
    try {
      const response = await axios.post('http://localhost:5000/createOrderPayment', {
        token,
        cartId,
        products,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create payment intent');
    }
  }
);

export const allOrders = createAsyncThunk(
  'order/allOrders',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch orders');
    }
  }
);

export const orderById = createAsyncThunk(
  'orders/orderById',
  async (id?: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/order/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch order by ID');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPaymentIntent.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.clientSecret = payload;
        state.orders = payload.order;
      })
      .addCase(allOrders.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.orders = payload;
      })
      .addCase(orderById.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.order = payload;
      });
  },
});

export default paymentSlice.reducer;

export const getOrders = (state: RootState): Order[] => state.orders.orders;
export const getOrder = (state: RootState): Order => state.orders.order;
