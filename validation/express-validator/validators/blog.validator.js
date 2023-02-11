const { param } = require("express-validator");

const IdValidator = param("id").isMongoId().withMessage("invalid objectId");
module.exports = {
    IdValidator
}