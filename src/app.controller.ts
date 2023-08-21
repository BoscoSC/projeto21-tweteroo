import {
  Controller,
  Get,
  Body,
  HttpCode,
  Post,
  Query,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { NewUserDto } from './dto/user.dto';
import { NewTweetDto } from './dto/tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('sign-up')
  @HttpCode(200)
  signUp(@Body() body: NewUserDto): string {
    return this.appService.signUp(body.username, body.avatar);
  }

  @Post('tweets')
  postTweet(@Body() body: NewTweetDto): string {
    return this.appService.postTweet(body.username, body.tweet);
  }

  @Get('tweets')
  getTweet(@Query('page') page: number | null): Tweet[] {
    return this.appService.getTweet(page);
  }

  @Get('tweets/:username')
  getTweetByUser(@Param('username') username: string) {
    return this.appService.getTweetByUser(username);
  }
}
