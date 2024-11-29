import { Controller, Get, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Req() req) {
    return {
      profile: 'Jaruwat',
      data : req.user
    }
  }

}
