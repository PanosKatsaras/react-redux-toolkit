import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        add(state, action) {
            const existingProduct = state.find(product => product.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                // If it's a new product, add it with a quantity of 1
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        remove(state, action) {
            const productIndex = state.findIndex(product => product.id === action.payload);
            if (productIndex !== -1) {
                const product = state[productIndex];
                if (product.quantity > 1) {
                    // Decrement the quantity if greater than 1
                    product.quantity -= 1;
                } else {
                    // Remove the product if quantity reaches 0
                    state.splice(productIndex, 1);
                }
            }
        },
    },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
