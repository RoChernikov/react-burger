import * as yup from 'yup';
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';

export const nameSchema = yup.string().min(3).max(18).required();
export const emailSchema = yup.string().email().required();
export const passSchema = yup.string().min(6).max(20).required();
export const resetCodeSchema = yup.string().required().length(36);

export const checkValidate = async (
  schema: RequiredStringSchema<string | undefined, AnyObject>,
  setFunc: (isValid: boolean) => void,
  inputValue: string
) => {
  const isValid = await schema.isValid(inputValue);
  !isValid ? setFunc(true) : setFunc(false);
};
