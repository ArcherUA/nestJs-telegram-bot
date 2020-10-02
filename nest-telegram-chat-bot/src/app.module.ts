import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BotController } from './privat-bot/bot.controller';
import { BotService } from './privat-bot/bot.service';
import { USD_RATE_ARCHIVE_DB_CONFIG } from './config/orm.config';
import {UsdRateArchive} from "./common/entities/usd-rate-aarchive.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...USD_RATE_ARCHIVE_DB_CONFIG,
      entities: [UsdRateArchive],
    }),
    TypeOrmModule.forFeature([UsdRateArchive]),
  ],
  controllers: [BotController],
  providers: [BotService],
  exports: [],
})
export class AppModule {}
