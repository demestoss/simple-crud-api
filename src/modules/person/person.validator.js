const Validator = require("../validator");
const { IncorrectTypeValidationError } = require("../error/errorTypes");

// TODO: rethink validator logic. Need to add config for routes
class PersonValidator extends Validator {
  validateDto = (req) => {
    const personDto = req.body;
    console.log(req.body);
    this._validateRequiredFields(personDto, ["name", "age", "hobbies"]);
    if (!this._isErrorsEmpty()) {
      this._throwErrors();
    }

    this._validateFieldByType(personDto, "name", "string");
    this._validateFieldByType(personDto, "age", "number");

    if (
      Array.isArray(personDto.hobbies) &&
      !personDto.hobbies.every((el) => typeof el === "string")
    ) {
      this._pushError(
        new IncorrectTypeValidationError("hobbies", "array of strings")
      );
    }
    if (!this._isErrorsEmpty()) {
      this._throwErrors();
    }

    this._clearErrors();
  };
}

module.exports = new PersonValidator();
