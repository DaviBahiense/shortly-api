import { Router } from "express";
import { createShorten, getShorten } from "../controllers/urlsController.js";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', createShorten);
urlsRouter.get('/urls/:shortUrl', getShorten);
export default urlsRouter;