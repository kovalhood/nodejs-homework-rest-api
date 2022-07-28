const express = require('express')

const Contact = require('../../models/contact');
const { createError } = require('../../helpers');
const { contactSchema, updateFavoriteSchema } = require('../../schemas');

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find({}, '-createdAt -updatedAt');
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw createError(404);
    }

    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
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
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
      throw createError(404);
    }

    res.json({
      message: "Contact deleted"
    });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
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
})

router.patch('/:contactId/favorite', async (req, res, next) => {
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
})

module.exports = router;
