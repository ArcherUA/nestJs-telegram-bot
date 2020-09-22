import { BotService } from './bot.service';
import { Get, Controller, Res, HttpStatus } from '@nestjs/common';

@Controller()
export class BotController {
  constructor(private botService: BotService) {
  }

  @Get()
  getBotDialog(@Res() res) {
    this.botService.botMessage();
    res.status(HttpStatus.OK).send("Bot service started");
  }
}
