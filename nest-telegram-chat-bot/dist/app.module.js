"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bot_controller_1 = require("./privat-bot/bot.controller");
const bot_service_1 = require("./privat-bot/bot.service");
const orm_config_1 = require("./config/orm.config");
const usd_rate_aarchive_entity_1 = require("./common/entities/usd-rate-aarchive.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(Object.assign(Object.assign({}, orm_config_1.USD_RATE_ARCHIVE_DB_CONFIG), { entities: [usd_rate_aarchive_entity_1.UsdRateArchive] })),
            typeorm_1.TypeOrmModule.forFeature([usd_rate_aarchive_entity_1.UsdRateArchive]),
        ],
        controllers: [bot_controller_1.BotController],
        providers: [bot_service_1.BotService],
        exports: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map