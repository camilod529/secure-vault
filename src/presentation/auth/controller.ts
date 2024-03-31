import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
  //* Dependency Injection
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    if (!registerDto) return res.status(500).json({ error: "Internal server error" });

    this.authService
      .registerUser(registerDto)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    if (!loginDto) return res.status(500).json({ error: "Internal server error" });

    this.authService
      .loginUser(loginDto)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };
}
