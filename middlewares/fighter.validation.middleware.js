import { FIGHTER } from "../models/fighter.js";

const handleError = (message, res) => {
  return res.status(400).json({ error: true, message });
};

const checkRequiredFields = (req, res, requiredFields) => {
  const fieldsTitles = ["Name", "Power", "Defense"];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      handleError(
        `${fieldsTitles[requiredFields.indexOf(field)]} is required`,
        res
      );
      return false;
    }
  }

  return true;
};

const checkForbiddenFields = (req, res, forbiddenFields) => {
  for (const field of forbiddenFields) {
    if (req.body[field]) {
      handleError(`The request contains a forbidden value '${field}'`, res);
      return false;
    }
  }

  return true;
};

const validateFields = (req, res, validations) => {
  for (const field in validations) {
    const { min, max, errorMessage } = validations[field];
    let value;

    if (field in req.body) {
      value = req.body[field];

      if (typeof value !== "number") {
        handleError(`Invalid value type for ${field}`, res);
        return false;
      }
    } else {
      value = validations[field].default; // Use the default value if field is not present in req.body
    }

    if (value < min || value > max) {
      handleError(errorMessage, res);
      return false;
    }
  }

  return true;
};

const createFighterValid = (req, res, next) => {
  const requiredFields = ["name", "power", "defense"];
  const forbiddenFields = ["id"];
  const validations = {
    power: {
      min: 1,
      max: 100,
      errorMessage: "Power must be between 1 and 100",
    },
    defense: {
      min: 1,
      max: 10,
      errorMessage: "Defense must be between 1 and 10",
    },
    health: {
      min: 80,
      max: 120,
      errorMessage: "Health must be between 80 and 120",
    },
  };

  const isRequiredValid = checkRequiredFields(req, res, requiredFields);
  const isForbiddenValid = checkForbiddenFields(req, res, forbiddenFields);
  const isFieldValidationValid = validateFields(req, res, validations);

  if (isRequiredValid && isForbiddenValid && isFieldValidationValid) {
    next();
  } else {
    handleError("Something went wrong", res);
  }
};

const updateFighterValid = (req, res, next) => {
  const requiredFields = ["name", "power", "defense", "health"];
  const forbiddenFields = ["id"];
  const validations = {
    power: {
      min: 1,
      max: 100,
      errorMessage: "Power must be between 1 and 100",
    },
    defense: {
      min: 1,
      max: 10,
      errorMessage: "Defense must be between 1 and 10",
    },
    health: {
      min: 80,
      max: 120,
      errorMessage: "Health must be between 80 and 120",
    },
  };

  const isRequiredValid = checkRequiredFields(req, res, requiredFields);
  const isForbiddenValid = checkForbiddenFields(req, res, forbiddenFields);
  const isFieldValidationValid = validateFields(req, res, validations);

  if (isRequiredValid && isForbiddenValid && isFieldValidationValid) {
    next();
  } else {
    handleError("Something went wrong", res);
  }
};

export { createFighterValid, updateFighterValid };
