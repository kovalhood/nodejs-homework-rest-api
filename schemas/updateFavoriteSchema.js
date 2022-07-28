const Joi = require('joi');

const updateFavoriteSchema = (data) =>
{
    const JoiSchema = Joi.object({
      favorite:Joi.bool().required(),
    })
  
    return JoiSchema.validate(data)
}

module.exports = updateFavoriteSchema;