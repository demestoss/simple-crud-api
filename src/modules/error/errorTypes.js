class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends DomainError {
  constructor(fieldName, message) {
    super(`${fieldName} is not valid. ${message}`);
    this.data = { fieldName, message };
  }
}

class RequiredValidationError extends ValidationError {
  constructor(fieldName) {
    super(fieldName, "Field is Required");
  }
}

class IncorrectTypeValidationError extends ValidationError {
  constructor(fieldName) {
    super(fieldName, "Field type is incorrect");
  }
}

class NotFoundError extends DomainError {
  constructor(modelName) {
    const message = `${modelName} was not found`;
    super(message);
    this.message = message;
  }
}

class InternalError extends DomainError {
  constructor(error) {
    super(error.message);
    this.data = { error };
  }
}

module.exports = {
  ValidationError,
  RequiredValidationError,
  IncorrectTypeValidationError,
  NotFoundError,
  InternalError,
};
