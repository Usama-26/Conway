import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TOrderProduct} from '../_types/types';
import {toast} from 'react-toastify';

export type CartState = {
  products: TOrderProduct[];
};

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<TOrderProduct>) => {
      const productExists = !!state.products.find(
        product => product.id === action.payload.id
      );

      if (productExists) {
        return;
      }

      state.products = [...state.products, action.payload];
    },

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

      state.products[idx].quantity += 1;
    },

    decrementProduct: (state, action: PayloadAction<number>) => {
      const idx = state.products.findIndex(
        product => product.id === action.payload
      );

      if (state.products[idx].quantity === 0) {
        return;
      }

      state.products[idx].quantity -= 1;
    },
  },
});

export const {addProduct, removeProduct, incrementProduct, decrementProduct} =
  cartSlice.actions;

export default cartSlice.reducer;
