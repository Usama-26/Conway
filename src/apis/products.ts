import {TProduct} from '_types/types';
import axiosInstance from 'utils/axios';

export async function getProductDetailApi(id: number) {
  return axiosInstance.get<TProduct>(`products/get_by_id/${id}`);
}
