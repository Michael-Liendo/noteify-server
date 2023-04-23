import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  full_name: Yup.string().min(1).required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .max(20)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});
