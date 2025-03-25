import { Router } from "express";

import { usersRouter } from "./users-routes";
import { refundsRoutes } from "./refunds-routes";

import { sessionsRouter } from "./sessions-routes";

const routes = Router();

//rotas publicas
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter)

//rotas privadas
routes.use("/refunds", refundsRoutes)

export { routes };