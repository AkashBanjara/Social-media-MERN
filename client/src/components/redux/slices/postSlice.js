import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";


export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const Response = await axiosClient.post("/user/getUserProfile", body);
      return Response.result;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  },
);

export const likeAndUnlike = createAsyncThunk(
  "posts/likeAndUnlike",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const Response = await axiosClient.post("posts/like",body)
        return Response.result.post;
    } catch (error) {
        return Promise.reject(error)
    }finally{
      thunkApi.dispatch(setLoading(false))
    }
  },
);

const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    userProfile: {},
  },

  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    })
    .addCase(likeAndUnlike.fulfilled, (state,action)=>{
        const post = action.payload;
        const index = state?.userProfile?.posts?.findIndex(item=> item._id === post._id);
      if(index && index != -1){
         state.userProfile.posts[index] = post;
      }
        
    })
  },
});

export default postSlice.reducer;