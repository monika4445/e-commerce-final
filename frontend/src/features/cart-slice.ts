import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface Image {
  id: number;
  fileName: string;
}
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  Image: Image[];
  quantity: number;
}

export interface Cart {
  cartId: number;
  productId: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  Product: Product;
  cartItem: Product;
}

interface CartState {
  status: string;
  carts: Cart[];
  error: null | string;
}

const initialState: CartState = {
  status: "idle",
  carts: [],
  error: null,
};

export interface Ids {
  productId: number;
  userId: number ;
}

export const createCart = createAsyncThunk(
  "carts/createCart",
  async ({ productId, userId }: Ids) => {
    const res = await fetch("http://localhost:5000/cartCartItem", {
      method: "POST",
      body: JSON.stringify({
        productId,
        userId,
        quantity: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = res.json();
    return json;
  }
);
export const deleteCartItem = createAsyncThunk(
  "carts/deleteCartItem",
  async (id: number) => {
    const res = await fetch(`http://localhost:5000/deleteCartItem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = res.json();
    return json;
  }
);
export const incrementQuantity = createAsyncThunk(
  "carts/increment",
  async (id: number) => {
    const res = await fetch(`http://localhost:5000/cartItem/increment/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = res.json();
    return json;
  }
);

export const decrementQuantity = createAsyncThunk(
  "carts/decrement",
  async (id: number) => {
    const res = await fetch(`http://localhost:5000/cartItem/decrement/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = res.json();
    return json;
  }
);

export const getCart = createAsyncThunk(
  "carts/getCart",
  async (id?: string) => {
    const res = await fetch(`http://localhost:5000/cartItem/${id}`);
    const json = await res.json();
    return json;
  }
);

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCartItemCount: (state, action) => {
      state.carts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.fulfilled, (state, action) => {
        (state.status = "success"), console.log(action.payload, "payl");
        if (action.payload) {
          state.carts.push(action.payload);
        }
      })
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.carts = payload && payload?.cartItems;
        console.log(payload, "p");
      })
      .addCase(deleteCartItem.fulfilled, (state, { payload }) => {
        state.status = "success";
        if (payload.cartItem) {
          state.carts.push(payload.cartItem);
        }
      })
      .addCase(incrementQuantity.fulfilled, (state, { payload }) => {
        state.status = "success";
        const productId = payload.cartItem.productId;
        const cartItemIndex = state.carts.findIndex(
          (item) => item.productId === productId
        );

        if (cartItemIndex !== -1) {
          state.carts[cartItemIndex].quantity += 1;
        }
        // state.carts.push(payload)
      })
      .addCase(decrementQuantity.fulfilled, (state, { payload }) => {
        state.status = "success";
        const cartItemId = payload.cartItem.productId;
        const cartItemIndex = state.carts.findIndex(
          (item) => item.productId === cartItemId
        );
        if (cartItemIndex !== -1) {
          if (state.carts[cartItemIndex].quantity > 1) {
            state.carts[cartItemIndex].quantity -= 1;
          }
        }
      });
  },
});

export default cartSlice.reducer;
export const getCartItems = (state: RootState): Cart[] => state.carts.carts;
export const { setCartItemCount } = cartSlice.actions;
