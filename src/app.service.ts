import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { NewUser } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private users: NewUser[] = [];
  private tweets: Tweet[] = [];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  signUp(username: string, avatar: string): string {
    this.users.push({ username, avatar });
    return 'Success';
  }

  postTweet(username: string, tweet: string) {
    const user = this.users.find((user) => user.username === username);

    if (!user) {
      throw new UnauthorizedException('Não esta logado');
    }

    this.tweets.push({ username, tweet, avatar: user.avatar });
    return 'Success';
  }

  getTweet(page: number | null): Tweet[] {
    if (page !== undefined && (page < 1 || isNaN(page))) {
      throw new BadRequestException();
    }

    const tweetsQuantity = this.tweets.length;
    const max = page === undefined ? 15 : page * 10;
    const min = page === undefined ? max - 15 : Math.floor((page * 15) / 2);

    const reverseTweets: Tweet[] = [];
    for (let i = tweetsQuantity - 1; i >= 0; i--) {
      const currentTweet = this.tweets[i];
      reverseTweets.push(currentTweet);
    }

    return reverseTweets.slice(min, max);
  }

  getTweetByUser(username: string): Tweet[] {
    const tweetsQuantity = this.tweets.length;
    const reverseTweets: Tweet[] = [];

    for (let i = tweetsQuantity - 1; i >= 0; i--) {
      const currentTweet = this.tweets[i];
      if (currentTweet.username === username) {
        reverseTweets.push(currentTweet);
        continue;
      }
    }
    return reverseTweets;
  }
}
