import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDto } from '../users/dto/response/user.dto';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'document' });
  }

  async validate(document: string, password: string): Promise<UserDto> {
    const user = await this.authService.validadeUser(document, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}