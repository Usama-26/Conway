import {TCategory, TFormField, TProduct} from '_types/types';
import * as Yup from 'yup';

export const getFormFieldAndValidations = (fields: TFormField[]) => {
  const formFields: {[key: string]: any} = {};
  const validations: any = {};
  fields.forEach(field => {
    formFields[field.field.slug] = '';
    // making validations
    let validationYup = Yup.string();
    if (field.visible === 'required')
      validationYup = validationYup.required(`Required!`);
    field.validation_rules?.forEach(validation => {
      if (validation.slug == 'email') validationYup = validationYup.email();

      // confirmatio fields
      if (validation.slug == 'confirmed') {
        formFields['password_confirmation'] = '';
        validations['password_confirmation'] = Yup.string()
          .required('Confirmation is required!')
          .oneOf(
            [Yup.ref(field.field.slug), null],
            'Password should be match.'
          );
      }
      // end confirmation field
    });
    validations[field.field.slug] = validationYup;
    // validations end
  });
  return {formFields, validations: Yup.object().shape(validations)};
};

export const isSideBarCategoryOpen = (category: TCategory, slug?: string) => {
  console.log(category, slug);
  if (!slug) return false;
  if (category.slug === slug) return true;
  return category.children?.some(cat => cat.slug === slug);
};

export const getProductImage = (product: TProduct) => {
  if (product.default_image) {
    return (
      process.env.NEXT_PUBLIC_MEDIA_BASE_PATH! +
      product.default_image.media?.path
    );
  }
  return product.product_medias && product.product_medias.length > 0
    ? process.env.NEXT_PUBLIC_MEDIA_BASE_PATH! +
        product.product_medias[0].media?.path
    : '/images/placeholder.png';
};

export const getCompareTo = (product: TProduct) => {
  const isOEM = product?.product_identifiers?.find(
    identifier => identifier.pi.short_name === 'OEM'
  );
  if (isOEM) return `Compare to ${isOEM.value}`;
  return '';
};
