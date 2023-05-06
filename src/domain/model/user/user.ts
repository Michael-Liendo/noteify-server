import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  full_name: Yup.string().min(1),
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$/)
    .required(),
});
