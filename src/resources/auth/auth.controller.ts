import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/request/auth-user.dto';
import { UserAccessDto } from './dto/response/user-access.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: AuthUserDto,
  })
  @ApiOkResponse({
    type: UserAccessDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
