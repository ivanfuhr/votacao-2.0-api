import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentsService } from 'src/configs/environments/environments.service';
import { USERS_SERVICE_TOKEN } from '../users/users.constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USERS_SERVICE_TOKEN)
    private readonly usersService: UsersService,
    private readonly environmentsService: EnvironmentsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentsService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    return this.usersService.findOne(payload.sub);
  }
}
