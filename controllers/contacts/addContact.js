const Contact = require('../../models/contact');
const { createError } = require('../../helpers');
const { contactSchema } = require('../../schemas');

const addContact = async (req, res, next) => {
    try {
        // Preventing lack of necessary data
        const { error } = contactSchema(req.body);
        if (error) {
            throw createError(400, "missing required name field");
        }

        const result = await Contact.create(req.body);
        res.status(201).json(result)
    } catch (error) {
        next(error);
    }
};

module.exports = addContact;