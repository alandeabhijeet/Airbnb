const Joi = require('joi');
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        titile : Joi.string().required,
        description: Joi.string().required,
        location: Joi.string().required,
        country: Joi.string().required,
    }).required()
})