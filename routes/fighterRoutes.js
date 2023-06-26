import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

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
    await handleRequest(req, res, next, fighterService.getFighters);
  },
  responseMiddleware
);

router.get(
  "/:id",
  async (req, res, next) => {
    const { id } = req.params;

    await handleRequest(req, res, next, () => fighterService.getFighter(id));
  },
  responseMiddleware
);

router.post(
  "",
  createFighterValid,
  async (req, res, next) => {
    await handleRequest(req, res, next, () =>
      fighterService.createFighter(req.body)
    );
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateFighterValid,
  async (req, res, next) => {
    const { id } = req.params;

    await handleRequest(req, res, next, () =>
      fighterService.updateFighter(id, req.body)
    );
  },
  responseMiddleware
);

router.delete(
  "/:id",
  async (req, res, next) => {
    const { id } = req.params;

    await handleRequest(req, res, next, () =>
      fighterService.deleteFighterById(id)
    );
  },
  responseMiddleware
);

export { router };
