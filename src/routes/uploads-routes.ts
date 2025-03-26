import { Router } from "express";

import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

import { UploadsController } from "@/controllers/uploads-controller";

const uploadsRoutes = Router();
const uploadsController = new UploadsController();

uploadsRoutes.use(verifyUserAuthorization(["employee"]))
uploadsRoutes.post("/", uploadsController.create)

export { uploadsRoutes }