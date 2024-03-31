import { CustomError } from "../errors/custom.error";

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string
  ) {}

  static fromObject(obj: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, password } = obj;

    if (!id && !_id) throw CustomError.badRequest("Missing ID");

    if (!name) throw CustomError.badRequest("Missing name");

    if (!email) throw CustomError.badRequest("Missing email");

    if (!password) throw CustomError.badRequest("Missing password");

    return new UserEntity(id || _id, name, email, password);
  }
}
