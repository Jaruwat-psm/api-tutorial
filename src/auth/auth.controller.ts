import { Controller, Body, Post, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.validateUser(body.username, body.password);

  }

  @Get('authorization')
  async checkHeader(@Headers('Authorization') authHeader: string) {
  return this.authService.checkToken(authHeader);
 }

}
