const Contact = require('../../models/contact');
const { createError } = require('../../helpers');
const { updateFavoriteSchema } = require('../../schemas');

const updateStatusContact = async (req, res, next) => {
  try {
    // Preventing lack of necessary data
    const { error } = updateFavoriteSchema(req.body);
    if (error) {
      throw createError(400, "missing field favorite");
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

module.exports = updateStatusContact;