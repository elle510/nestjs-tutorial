import { Body, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dtos/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) // AuthGuard 사용한다는 것은 jwt.strategy 에서 토큰의 유효성을 체크하고 validate 함수에서 리턴하는 user 객체를 req 안에 넣는다는 것이다.
  test(@Req() req) {
    console.log('req', req);
  }
}
