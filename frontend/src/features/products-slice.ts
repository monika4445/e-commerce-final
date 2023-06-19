import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface Image {
  fileName: string;
}
interface Product{
  id: number;
  name: string;
  price: number;
  description: string;
  Images: Image[];
  quantity: number;
}
export interface ProductSt {
  cartId: number;
  id: number;
  name: string;
  price: number;
  description: string;
  Images: Image[];
  quantity: number;
  products:Product
}

interface ProductState {
  products: ProductSt[];
  product:ProductSt | null;
  totalPages: number;
  error: string | null;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: ProductState = {
  products: [],
  product:{} as ProductSt,
  totalPages: 0,
  error: null,
  status: "idle"
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (currentPage:number) => {
    // const res = await fetch("http://localhost:5000/products");
    const res = await fetch(`http://localhost:5000/products?page=${currentPage}&pageSize=2`);
    const json = await res.json();
    return json;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id?: string) => {
    const res = await fetch(`http://localhost:5000/product/${id}`);
    const json = await res.json();
    console.log(json,'j');
    return json;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<{ products: ProductSt[], totalPages: number }>) => {
          state.status = "success";
          console.log(action.payload,'pr');
          state.products = action.payload.products;
          state.totalPages = action.payload.totalPages;
          // state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.product = payload; 
      });
  },
});

export default productsSlice.reducer;
export const allProducts = (state: RootState): ProductSt[] => state.products.products;
export const singleProduct = (state: RootState): ProductSt | null => state.products.product;
