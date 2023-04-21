import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {TProductPartsRel} from '../../_types/types';
import {CART_STATE} from '_constant';
import {TOrder, TOrderProductsRel} from '_types/order';
import {addRFQProduct} from '../reducers/cart';

export type CartState = {
  order?: TOrder;
  products: TOrderProductsRel[];
};

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: CART_STATE,
  initialState,
  reducers: {
    // removes the product with the given id
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        product => product.id !== action.payload
      );
    },

    incrementProduct: (state, action: PayloadAction<number>) => {
      const idx = state.products.findIndex(
        product => product.id === action.payload
      );

      state.products[idx].qty = Number(state.products[idx].qty) + 1;
    },

    decrementProduct: (state, action: PayloadAction<number>) => {
      const idx = state.products.findIndex(
        product => product.id === action.payload
      );

      if (state.products[idx].qty === 0) {
        return;
      }

      state.products[idx].qty = Number(state.products[idx].qty) - 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addRFQProduct.pending, state => {
        // state.loading = true;
      })
      .addCase(addRFQProduct.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action);
        state.order = action.payload.data.order;
        state.products = action.payload.data.items;
      })
      .addCase(addRFQProduct.rejected, state => {
        // state.loading = false;
      });
  },
});

export const {removeProduct, incrementProduct, decrementProduct} =
  cartSlice.actions;

export default cartSlice.reducer;
