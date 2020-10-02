"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotController = void 0;
const bot_service_1 = require("./bot.service");
const common_1 = require("@nestjs/common");
let BotController = class BotController {
    constructor(botService) {
        this.botService = botService;
    }
    getBotDialog(res) {
        this.botService.botMessage();
        res.status(common_1.HttpStatus.OK).send('Bot service started');
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BotController.prototype, "getBotDialog", null);
BotController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [bot_service_1.BotService])
], BotController);
exports.BotController = BotController;
//# sourceMappingURL=bot.controller.js.map