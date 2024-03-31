import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // auth Routes
    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
