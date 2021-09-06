import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // Header 에 담겨있는 BearerToken 과 토근의 header + payload 그리고 secretOrKey 로 생성한 토큰을 비교하여 유효성 체크한다.
    super({
      secretOrKey: 'Secret1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // 토큰이 유효하면 아래 validate 함수가 호출된다.
  async validate(payload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
