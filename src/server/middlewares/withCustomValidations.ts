import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {baseIsUnique} from 'server/db';
import customerModel from 'server/models/customerModel';
import formFieldModel from 'server/models/formFieldModel';
import * as Yup from 'yup';
import {AnyObject} from 'yup/lib/types';
import {TFormField} from '_types/types';

export function withCustomValidations(
  customFormId: number,
  handler: NextApiHandler
) {
  return async function (request: NextApiRequest, response: NextApiResponse) {
    const customFormFields = await formFieldModel.find({
      where: `custom_form_id=${customFormId}`,
    });
    const {validations} = getFormFieldAndValidations(customFormFields);
    try {
      request.body = await validations.validate(request.body, {
        abortEarly: false,
      });
      return handler(request, response);
    } catch (error) {
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        return response.status(422).json({errors: error.inner, message:'Validation error.'});
      }

      return response.status(422).json('');
    }
  };
}

const getFormFieldAndValidations = (fields: TFormField[]) => {
  const formFields: {[key: string]: any} = {};
  const validations: any = {};
  fields.forEach(field => {
    formFields[field.field.slug] = '';
    // making validations
    let validationYup = Yup.string();
    if (field.visible === 'required')
      validationYup = validationYup.required(`Required!`);

    field.validation_rules?.forEach(validation => {
      if (validation.slug == 'email') {
        validationYup = validationYup.email();
      }

      if (validation.slug == 'unique') {
        validationYup = getUniqueValidation(validationYup, field);
      }

      if (validation.slug == 'min' && field.field.slug === 'password') {
        validationYup = validationYup.min(8);
      }

      // confirmatio fields
      if (validation.slug == 'confirmed') {
        formFields['password_confirmation'] = '';
        validations['password_confirmation'] = Yup.string()
          .required('Password confirmation is required!')
          .oneOf([Yup.ref(field.field.slug), null]);
      }
      // end confirmation field
    });
    validations[field.field.slug] = validationYup;
    // validations end
  });
  return {formFields, validations: Yup.object().shape(validations)};
};

const getUniqueValidation = (
  validationYup: Yup.StringSchema<
    string | undefined,
    AnyObject,
    string | undefined
  >,
  field: TFormField
) => {
  return validationYup.test(
    'unique',
    ({label}) => `${field.field.translation.description} should be uniqe!`, // a message can also be a function
    async (value, testContext) => {
      const isRecordExist = await baseIsUnique({
        licenseDb: true,
        table: field.referenced_to,
        field: field.field.slug,
        value: value || '',
      });
      return !!!isRecordExist;
    }
  );
};
