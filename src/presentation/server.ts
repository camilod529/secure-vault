import express, { Router } from "express";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public app = express();
  private readonly port: number;
  private readonly routes: Router;
  private serverListener?: any;

  constructor(private options: Options) {
    const { port, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    // app routes
    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
