import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import RequestWithUser from './interface/request-with-user.interface';
import { LocalAuthGuard } from './guard/local-auth.guard';
import JwtAuthGuard from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;

    if (!user.id) {
      throw new UnauthorizedException();
    }

    const cookie = this.authService.getCookieWithJwtToken(user.id);

    response.headers.set('Set-Cookie', cookie);

    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.headers.set('Set-Cookie', this.authService.getCookieForLogOut());
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;

    return user;
  }
}
