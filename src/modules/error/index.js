const StatusCodes = require("../../constants/StatusCodes");
const { NotFoundError } = require("./errorTypes");
const { ValidationError } = require("./errorTypes");

const isValidationError = (error) => error instanceof ValidationError;
const isNotFoundError = (error) => error instanceof NotFoundError;

const parse = (error) => {
  if (error.length) {
    if (isValidationError(error[0])) {
      return {
        code: StatusCodes.VALIDATION_ERROR,
        message: error.map((error) => error.data),
      };
    }
  }

  if (isValidationError(error)) {
    return {
      code: StatusCodes.VALIDATION_ERROR,
      message: [error.data],
    };
  } else if (isNotFoundError(error)) {
    return {
      code: StatusCodes.NOT_FOUND,
      message: error.data,
    };
  } else {
    return {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

const errorHandler = (req, res, error) => {
  const parsedError = parse(error);

  res.status(parsedError.code).json({ data: parsedError.message });
};

module.exports = errorHandler;
