import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductSt } from "./products-slice";
import { RootState } from "../app/store";

export interface Category {
    id: number;
    name: string;
    Products?: ProductSt[] | null;
  }
  
  interface CategoryState {
    categories: Category[];
    oneCategory: Category | null; 
    error: null | string;
    status: "idle" | "loading" | "success" | "error";
  }
  
  const initialState: CategoryState = {
    categories:[],
    oneCategory: {} as Category,
    error: null,
    status: "idle",
  };

  export const fetchCategories = createAsyncThunk('categories/fetchCategories', async()=>{
    const res = await fetch(`http://localhost:5000/categories`);
    const json = await res.json();
    return json;
})


export const fetchCategory = createAsyncThunk('category/fetchCategory', async(id:string)=>{
    const res = await fetch(`http://localhost:5000/category/${id}`);
    const json = await res.json();
    return json;
})

const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.fulfilled, (state, action)=>{
            state.status = 'success';
            state.categories = action.payload;
        }).
        addCase(fetchCategory.fulfilled, (state, action)=>{
            state.status = 'success';
            state.oneCategory = action.payload;
            console.log(action.payload,'pay');
        })
    }
})

export default categoriesSlice.reducer;
export const getCategories = (state: RootState): Category[] => state.categories.categories;
export const getCategory = (state: RootState): Category | null => state.categories.oneCategory;

