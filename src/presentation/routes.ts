import { Router } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // auth Routes
    // router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
