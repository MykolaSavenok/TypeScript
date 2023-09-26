import { createAction } from "@reduxjs/toolkit";

export type addProduct = { id: number; caption: string; amount: number };

export default createAction<addProduct>("ADD_PRODUCT");