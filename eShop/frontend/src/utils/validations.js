import Joi from "joi-browser";

const validate = (data, schema) => {
  const { error } = Joi.validate(data, schema, { abortEarly: false });
  if (!error) return null;
  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};

export const handleSubmit = (data, schema, setErrors, onSubmit) => {
  const errors = validate(data, schema);
  setErrors(errors || null);
  if (errors) return;
  onSubmit();
};
