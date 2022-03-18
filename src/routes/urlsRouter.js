import { Router } from "express";
import { createShorten, deleteShorten, getShorten } from "../controllers/urlsController.js";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', createShorten);
urlsRouter.get('/urls/:shortUrl', getShorten);
urlsRouter.delete('/urls/:id', deleteShorten);

export default urlsRouter;