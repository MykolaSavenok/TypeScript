import { createReducer } from "@reduxjs/toolkit";
import addProduct from "../actions/addProduct";
import editProduct from "../actions/editProduct"
import removeProduct from "../actions/removeProduct"

export type Product = {
   id: number;
   caption: string;
   amount: number;
};

export type ProductsState = {
   products: Product[];
};

const initialState: ProductsState = {
   products: [],
};

const reduxReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(addProduct, (state, action) => {
         state.products.push(action.payload);
      })
      .addCase(removeProduct, (state, action) => {
         state.products = state.products.filter((product) => product.id !== action.payload.id);
      })
      .addCase(editProduct, (state, action) => {
         const productIndex = state.products.findIndex((product) => product.id === action.payload.id);
         if (productIndex !== -1) {
            state.products[productIndex] = {
               ...state.products[productIndex],
               caption: action.payload.caption,
               amount: action.payload.amount,
            };
         }
      });
});

export default reduxReducer;