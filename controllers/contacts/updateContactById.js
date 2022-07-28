const Contact = require('../../models/contact');
const { createError } = require('../../helpers');
const { contactSchema } = require('../../schemas');

const updateContactById = async (req, res, next) => {
  try {
    // Preventing lack of necessary data
    const { error } = contactSchema(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

    if (!result) {
      throw createError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = updateContactById;