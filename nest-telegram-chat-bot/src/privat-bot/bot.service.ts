import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { UsdRateArchive } from '../common/entities/usd-rate-aarchive.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class BotService {
  public constructor(
    @InjectRepository(UsdRateArchive)
    protected readonly usdRateArchiveRepository: Repository<UsdRateArchive>,
  ) {
    this.botMessage();
  }

  async botMessage() {
    process.env.NTBA_FIX_319 = '1';
    const TelegramBot = require('node-telegram-bot-api');

    const token = '726387592:AAFtnQIANCqfRno7heVZfw1F1h8yUED2P8M';

    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', (msg) => {
      const start = '/start';

      if (msg.text.toString().toLowerCase().indexOf(start) === 0) {
        const recipientId =
          msg.from.id === msg.chat.id ? msg.from.id : msg.chat.id;

        bot.sendMessage(
          recipientId,
          `Hello ${msg.from.first_name} what would you like to know about me?\nShow all commands - /help`,
        );
      }
    });
    bot.on('message', (msg) => {
      const help = '/help';

      if (msg.text.toString().toLowerCase().indexOf(help) === 0) {
        const recipientId =
          msg.from.id === msg.chat.id ? msg.from.id : msg.chat.id;

        bot.sendMessage(
          recipientId,
          '- Показать все терминалы на Титова - /titova' +
            '\n- Показать все терминалы на Глинки - /glinki' +
            '\n- Посмотреть курс доллара к гривне - /dollar_rate' +
            '\n- Курс доллара (история запросов) - /hist_usd_rate',
        );
      }
    });
    bot.on('message', async (msg) => {
      const message = '/usd_rate';
      const url =
        'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
      const req = await axios.get(url).then((response) => response.data);
      const alreadyWriteRate = await this.usdRateArchiveRepository.findOne({
        where: {
          buy: req[0].buy,
          sale: req[0].sale,
        },
      });

      if (msg.text.toString().toLowerCase().indexOf(message) === 0) {
        const recipientId =
          msg.from.id === msg.chat.id ? msg.from.id : msg.chat.id;

        if (!alreadyWriteRate) {
          await this.usdRateArchiveRepository.save({
            buy: req[0].buy,
            sale: req[0].sale,
          });
          bot.sendMessage(
            recipientId,
            `Валюта: ${req[0].ccy},\nПокупка: ${req[0].buy},\nПродажа: ${req[0].sale}`,
          );
        } else {
          bot.sendMessage(
            recipientId,
            `Валюта: ${req[0].ccy},\nПокупка: ${req[0].buy},\nПродажа: ${req[0].sale}`,
          );
        }
      }
    });

    bot.on('message', async (msg) => {
      const message = '/titova';
      const url = await encodeURI(
        'https://api.privatbank.ua/p24api/infrastructure?json&atm&address=Титова&city=Днепр',
      );
      const req = await axios
        .get(url)
        .then((response) => response.data.devices);

      const adresses = [];

      req.forEach(function (arr) {
        const array = arr.fullAddressUa.replace(
          'Україна,область Дніпропетровська,',
          '',
        );

        adresses.push(' - ' + array, arr.placeRu);
      });

      if (msg.text.toString().toLowerCase().indexOf(message) === 0) {
        const recipientId =
          msg.from.id === msg.chat.id ? msg.from.id : msg.chat.id;

        bot.sendMessage(
          recipientId,
          `Терминалы самообслуживания на улице Титова: \n${adresses.join(
            '\n',
          )}`,
        );
      }
    });

    bot.on('message', async (msg) => {
      const message = '/glinki';
      const url = await encodeURI(
        'https://api.privatbank.ua/p24api/infrastructure?json&atm&address=Глинки&city=Днепр',
      );
      const req = await axios
        .get(url)
        .then((response) => response.data.devices);
      const adresses = [];

      req.forEach(function (arr) {
        const array = arr.fullAddressUa.replace(
          'Україна,область Дніпропетровська,',
          '',
        );

        adresses.push(' - ' + array, arr.placeRu);
      });

      if (msg.text.toString().toLowerCase().indexOf(message) === 0) {
        const recipientId =
          msg.from.id === msg.chat.id ? msg.from.id : msg.chat.id;

        bot.sendMessage(
          recipientId,
          `Терминалы самообслуживания на улице Глинки: \n${adresses.join(
            '\n',
          )}`,
        );
      }
    });

    bot.on('message', async (msg) => {
      const message = '/hist_usd_rate';
      const history = await this.usdRateArchiveRepository.find();

      const array = [];

      history.forEach(function (obj) {
        array.push(
          '- Дата создания: ' +
            obj.createdAt +
            '\n' +
            'Покупка: ' +
            obj.buy +
            '\n' +
            'Продажа: ' +
            obj.sale +
            '\n',
        );
      });
      if (msg.text.toString().toLowerCase().indexOf(message) === 0) {
        const recipientId =
          msg.from.id === msg.chat.id ? msg.from.id : msg.chat.id;

        if (array.length > 0) {
          bot.sendMessage(
            recipientId,
            `История запросов: \n${array.join('\n')}`,
          );
        } else {
          bot.sendMessage(
            recipientId,
            `История запросов пуста \nТекущий курс доллара - /usd_rate`,
          );
        }
      }
    });
  }
}
