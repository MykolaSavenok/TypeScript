import { createAction } from "@reduxjs/toolkit";

export type editProduct = { id: number; caption: string; amount: number };

export default createAction<editProduct>("EDIT_PRODUCTT");