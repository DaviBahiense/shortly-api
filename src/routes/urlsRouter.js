import { Router } from "express";
import { createShorten } from "../controllers/urlsController.js";

import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const urlsRouter = Router();

urlsRouter.post('/urls', createShorten);
//urlsRouter.get('/users', validateTokenMiddleware, getUser);
export default urlsRouter;