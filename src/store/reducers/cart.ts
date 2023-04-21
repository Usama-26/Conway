import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from 'utils/axios';
import {TRootState, store} from './../index';
import {addOrderAPI, updateOrderAPI} from 'apis/orders';
import {TOrder} from '_types';
import {useSession} from 'next-auth/react';

export type AddRFQData = {
  customer_id: number;
  module_id: number;
  created_by: number;
  modified_by: number;
};

export type AddRFQProductData = {
  customer_id: number;
  order?: TOrder;
  items: any[];
};

export const addRFQ = createAsyncThunk(
  'cart/add_rfq',
  async (data: AddRFQData, {rejectWithValue}) => {
    try {
      return await axiosInstance.post('orders', data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addRFQProduct = createAsyncThunk(
  'cart/add_rfq_product',
  async (data: AddRFQProductData, {rejectWithValue}) => {
    const {cart} = store.getState();
    let order = cart?.order;

    if (!order) {
      const newOrder: Partial<TOrder> = {
        customer_id: data.customer_id,
        module_id: 1,
        status_is: 1,
        created_by: data.customer_id,
        modified_by: data.customer_id,
      };
      try {
        const res = await addOrderAPI(newOrder);
        order = res.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
    if (order) {
      try {
        return await updateOrderAPI(order.id, data);
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }

    return rejectWithValue('Some error has been occured!');
  }
);
