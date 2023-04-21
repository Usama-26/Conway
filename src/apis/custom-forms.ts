import axiosInstance from 'utils/axios';

export async function getCustomFormApi<T = unknown>(id: number) {
  return axiosInstance.get<T | null>(`custom_forms/${id}`);
}
