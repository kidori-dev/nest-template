import { Command, CommandRunner } from 'nest-commander';
import { UserService } from '../modules/user/user.service';

@Command({ name: `user`, description: `user command data` })
export class userCommand extends CommandRunner {
  constructor(private readonly userService: UserService) {
    super();
  }

  async run(): Promise<void> {
    console.log(`user command`);
    const list = await this.userService.findOne({});
    console.log(list);
    process.exit();
  }
}
