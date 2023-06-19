import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCount: 0,
};

const totalCountSlice = createSlice({
  name: "totalCount",
  initialState,
  reducers: {
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setTotalCount } = totalCountSlice.actions;
export default totalCountSlice.reducer;
