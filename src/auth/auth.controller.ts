import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { Auth, GetUser, RawHeaders } from './decorators';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    return {
      user,
      userEmail,
      rawHeaders,
    };
  }

  @Get('private2')
  @RoleProtected(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoute2(@GetUser() user: User) {
    return {
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.ADMIN)
  testingPrivateRoute3(@GetUser() user: User) {
    return {
      user,
    };
  }
}
