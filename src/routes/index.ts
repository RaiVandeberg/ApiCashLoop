import { Router } from "express";

import { usersRouter } from "./users-routes";
import { refundsRoutes } from "./refunds-routes";

import { sessionsRouter } from "./sessions-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { uploadsRoutes } from "./uploads-routes";

const routes = Router();

//rotas publicas
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter)

//rotas privadas
routes.use(ensureAuthenticated)
routes.use("/refunds", refundsRoutes)
routes.use("/uploads", uploadsRoutes)

export { routes };