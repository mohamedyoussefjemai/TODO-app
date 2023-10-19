import Joi from 'joi';

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const registerSchema = Joi.object({
  email: Joi.string().empty().email().required(),
  password: Joi.string()
    .empty()
    .min(6)
    .max(150)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/)
    .required(),
  confirmPassword: Joi.string()
    .empty()
    .min(6)
    .max(150)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/)
    .required(),
  name: Joi.string().empty().required(),
});

export default userLoginSchema;
export { registerSchema };
