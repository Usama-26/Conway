import {TOrder} from '_types';
import axiosInstance from 'utils/axios';

export async function addOrderAPI(data: Partial<TOrder>) {
  return axiosInstance.post<TOrder>(`orders`, data);
}

export async function updateOrderAPI(id: number, data: any) {
  return axiosInstance.get<TOrder>(`orders/${id}`, data);
}
