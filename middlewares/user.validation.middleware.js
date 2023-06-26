import { USER } from "../models/user.js";

const handleError = (message, res) => {
  return res.status(400).json({ error: true, message });
};

const checkRequiredFields = (req, res, requiredFields, fieldsTitles) => {
  for (const field of requiredFields) {
    if (!req.body[field]) {
      const fieldTitle = fieldsTitles[requiredFields.indexOf(field)];
      handleError(`${fieldTitle} is required`, res);
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

const validateFields = (req, res) => {
  const { email, password, phoneNumber } = req.body;
  const emailRegex = /^\w+@gmail\.com$/;
  const phoneNumberRegex = /^\+380\d{9}$/;

  if (!emailRegex.test(email)) {
    handleError("For registration you must write Google email (gmail)", res);
    return false;
  }

  if (!phoneNumberRegex.test(phoneNumber)) {
    handleError(
      "You must use Ukrainian phone number, format +380xxxxxxxxx",
      res
    );
    return false;
  }

  if (password.length < 3) {
    handleError("The password must be more than 3 symbols", res);
    return false;
  }

  return true;
};

const createUserValid = (req, res, next) => {
  const requiredFields = [
    "email",
    "password",
    "firstName",
    "lastName",
    "phoneNumber",
  ];
  const fieldsTitles = ["Email", "Password", "Name", "Surname", "Phone number"];
  const forbiddenFields = ["id"];

  const isRequiredValid = checkRequiredFields(
    req,
    res,
    requiredFields,
    fieldsTitles
  );
  const isForbiddenValid = checkForbiddenFields(req, res, forbiddenFields);
  const isFieldValidationValid = validateFields(req, res);

  if (isRequiredValid && isForbiddenValid && isFieldValidationValid) {
    next();
  } else {
    handleError("Something went wrong", res);
  }
};

const updateUserValid = (req, res, next) => {
  const requiredFields = [
    "email",
    "password",
    "firstName",
    "lastName",
    "phoneNumber",
  ];
  const forbiddenFields = ["id"];

  const isRequiredValid = checkRequiredFields(req, res, requiredFields);
  const isForbiddenValid = checkForbiddenFields(req, res, forbiddenFields);
  const isFieldValidationValid = validateFields(req, res);

  if (isRequiredValid && isForbiddenValid && isFieldValidationValid) {
    next();
  } else {
    handleError("Something went wrong", res);
  }
};

export { createUserValid, updateUserValid };
