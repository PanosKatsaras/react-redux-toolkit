import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";

const initialState = {
    data: [],
    status: StatusCode.IDLE
};

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        // fetchProducts(state, action){
        //     state.data = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state, action) => {
            state.status = StatusCode.LOADING;
        })
        .addCase(getProducts.fulfilled, (state, action) =>{
            state.data = action.payload;
            state.status = StatusCode.IDLE;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.status = StatusCode.ERROR;
        }
           
        )
    }
});

// export const {fetchProducts} = productSlice.actions;
export default productSlice.reducer;

// export function getProducts() {
//     return async function getProductsThunk(dispatch) {
//         const data = await fetch("https://fakestoreapi.com/products");
//         const result = await data.json(); // Await the JSON response
//         dispatch(fetchProducts(result)); // Dispatch the actual data
//     };
// }

export const getProducts = createAsyncThunk('products/get', async() => {
    const data = await fetch("https://fakestoreapi.com/products");
    const result = await data.json(); 
    return result;
}) 
   
    

