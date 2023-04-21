import axiosInstance from 'utils/axios';

export async function getFormFieldsApi<T = unknown>(customFormId?: number) {
  return axiosInstance.get<T | []>(
    `form_fields?custom_form_id=${customFormId}`
  );
}
