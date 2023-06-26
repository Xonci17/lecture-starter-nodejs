import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

const handleRequest = async (req, res, next, handler) => {
  try {
    const result = await handler(req);

    res.data = result;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

router.get(
  "",
  async (req, res, next) => {
    await handleRequest(req, res, next, userService.getUsers);
  },
  responseMiddleware
);

router.get(
  "/:id",
  async (req, res, next) => {
    const { id } = req.params;

    await handleRequest(req, res, next, () => userService.getUser(id));
  },
  responseMiddleware
);

router.post(
  "",
  createUserValid,
  async (req, res, next) => {
    await handleRequest(req, res, next, () => userService.createUser(req.body));
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;

    await handleRequest(req, res, next, () =>
      userService.updateUser(id, updatedData)
    );
  },
  responseMiddleware
);

router.delete(
  "/:id",
  async (req, res, next) => {
    const { id } = req.params;

    await handleRequest(req, res, next, () => {
      const deletedUser = userService.deleteUser(id);
      return {
        isDeleted: Boolean(deletedUser),
        deletedAccount: deletedUser,
      };
    });
  },
  responseMiddleware
);

export { router };
