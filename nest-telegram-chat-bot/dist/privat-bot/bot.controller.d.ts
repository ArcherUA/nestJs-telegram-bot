import { BotService } from './bot.service';
export declare class BotController {
    private botService;
    constructor(botService: BotService);
    getBotDialog(res: any): void;
}
