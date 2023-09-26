import { createAction } from "@reduxjs/toolkit";

export type removeProduct = { id: number }

export default createAction<removeProduct>("REMOVE_PRODUCT");