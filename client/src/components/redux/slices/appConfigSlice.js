import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../../utils/axiosClient";

export const getMyInfo = createAsyncThunk("user/getMyInfo", async () => {
  try {
    const Response = await axiosClient.get("/user/getMyInfo");
    return Response.result;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const updateMyProfile = createAsyncThunk(
  "/user/updateMyProfile",
  async (body) => {
    try {
      const response = await axiosClient.put("/user/", body);
      return response.result;
    } catch (err) {
      return Promise.reject(err);
    }
  },
);

const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload?.user;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      });
  },
});

export default appConfigSlice.reducer;
export const { setLoading, showToast } = appConfigSlice.actions;
