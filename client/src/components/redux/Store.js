import { configureStore } from '@reduxjs/toolkit';
import appConfigReducer from './slices/appConfigSlice';
import postReducer from './slices/postSlice';
import feedReducer from './slices/feedSlice';

export default configureStore({
    reducer:{
        appConfigReducer,
        postReducer,
        feedReducer
    }
    
})