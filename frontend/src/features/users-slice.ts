
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  userName: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  errorLogin: string | null | undefined;
  errorRegister: string | null | undefined;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: UserState = {
  users: [],
  errorLogin: null,
  errorRegister: null,
  status: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch("http://localhost:5000/users");
  const json = res.json();
  return json;
});

export const register = createAsyncThunk(
    "users/register",
    async ({ user }: { user: User }) => {
      try {
        const res = await fetch("http://localhost:5000/register", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (res.ok) {
          const json = await res.json();
          return json;
        } else {
          const errorMsg = await res.json();
          throw new Error(errorMsg.error);
        }
      } catch (err: any) {
        console.log(err, 'err');
        throw new Error(err);
      }
    }
  );
  

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
    "users/login",
    async ({ user }: { user: LoginPayload }) => {
      try {
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const json = await res.json();
        if (res.ok) {
          return json;
        } 
      } catch (err: any) {
        throw new Error(err);
      }
    }
  );
  
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "success";
        state.users.push(action.payload);
        console.log(action.payload);
      }).addCase(register.rejected, (state, action) => {
        state.status = "error";
        console.log(action,'a');
        state.errorRegister = action.error.message ;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload?.jwt) {
          return localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        console.log(action,'a');
        state.errorLogin = action.error.message ;
      });
  },
});

export default usersSlice.reducer;
