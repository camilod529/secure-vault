import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongo";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
  //* Dependency Injection
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest("User email already exists");

    try {
      const user = new UserModel(registerUserDto);

      // Encrypt password
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      const { password, ...userEntity } = UserEntity.fromObject(user);

      // JWT token
      const token = await JwtAdapter.generateToken({ id: userEntity.id });

      return {
        user: userEntity,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    // findone for user verification
    const user = await UserModel.findOne({ email: loginUserDto.email });

    if (!user) throw CustomError.badRequest("Invalid email or password");

    // match password (passwd, mongoose passwd)

    const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password);

    if (!isMatch) throw CustomError.badRequest("Invalid email or password");

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: userEntity.id });

    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      user: userEntity,
      token,
    };
  }
}
