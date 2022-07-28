const Joi = require('joi');

const contactSchema = (data) =>
{
    const JoiSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    })
  
    return JoiSchema.validate(data)
}

module.exports = contactSchema;

