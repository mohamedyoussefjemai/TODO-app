import Joi from 'joi';

const validateToDoInput = Joi.object({
  content: Joi.string().min(1).max(300).required(),
});

export default validateToDoInput;
