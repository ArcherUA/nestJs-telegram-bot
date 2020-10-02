import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import axios from 'axios';
import * as TelegramBot from 'node-telegram-bot-api';
import {UsdRateArchive} from '../common/entities/usd-rate-aarchive.entity';
import {Repository} from 'typeorm/index';
import {CommandBot} from '../common/enums/command.bot.enum';
import * as moment from 'moment';

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

    const token = '726387592:AAFtnQIANCqfRno7heVZfw1F1h8yUED2P8M';

    const bot = new TelegramBot(token, {polling: true});

    const options = {
      parse_mode: 'Markdown',
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: 'Терминалы на Титова',
              callback_data: `${CommandBot.TERMINAL_TITOVA}`,
            },
          ],
          [
            {
              text: 'Терминалы на Глинки',
              callback_data: `${CommandBot.TERMINAL_GLINKI}`,
            },
          ],
          [
            {
              text: 'Курс доллара',
              callback_data: `${CommandBot.USD_RATE}`,
            },
          ],
          [
            {
              text: 'История запросов курса доллара',
              callback_data: `${CommandBot.HISTORY_USD_RATE}`,
            },
          ],
          [
            {
              text: 'Конвертация UAH to USD',
              callback_data: `${CommandBot.UAH_TO_USD}`,
            },
          ],
        ],
      }),
    };

    bot.onText(/\/start/, (msg) => {
      const recipientId =
        msg.from.id === msg.chat.id ? msg.from.id : msg.chat.id;

      bot.sendMessage(
        recipientId,
        `Приветствую ${msg.from.first_name + ' ' + msg.from.last_name} !` +
        `\nЧто вы хотите посмотреть? \nПоказать все команды - /help`,
      );
    });

    bot.onText(/\/help/, async (msg) => {
      const recipientId =
        msg.from.id === msg.chat.id ? msg.from.id : msg.chat.id;

      bot.sendMessage(recipientId, `Выберите нужный пункт`, options);
    });

    bot.on('callback_query', async (msg) => {
      if (msg.data.toString() === CommandBot.TERMINAL_TITOVA) {
        return terminalTitovaSearch(msg);
      }
      if (msg.data.toString() === CommandBot.TERMINAL_GLINKI) {
        return terminalGlinkiSearch(msg);
      }
      if (msg.data.toString() === CommandBot.USD_RATE) {
        const url =
          'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
        const req = await axios.get(url).then((response) => response.data);
        const alreadyWriteRate = await this.usdRateArchiveRepository.findOne({
          where: {
            buy: req[0].buy,
            sale: req[0].sale,
          },
        });

        if (!alreadyWriteRate) {
          await this.usdRateArchiveRepository.save({
            buy: req[0].buy,
            sale: req[0].sale,
          });

          return usdRateFetch(msg, req);
        }

        return usdRateFetch(msg, req);
      }
      if (msg.data.toString() === CommandBot.HISTORY_USD_RATE) {
        const history = await this.usdRateArchiveRepository.find();

        return histUsdRate(msg, history);
      }
      if (msg.data.toString() === CommandBot.UAH_TO_USD) {
        const url =
          'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
        const req = await axios.get(url).then((response) => response.data);

        return uahToUsd(req[0].buy, msg);
      }
    });

    async function uahToUsd(usdRate, msg) {
      const recipientId =
        msg.message.from.id === msg.message.chat.id
          ? msg.message.from.id
          : msg.message.chat.id;

      bot.sendMessage(
        recipientId,
        'Введите сумму UAH для конвертации в формате "/set 1000" ',
      );
      bot.onText(/\/set/, (msg) => {
        const uah = msg.text.split(' ');
        const usd = uah[1] / usdRate;
        const date = moment().format('L');

        bot.sendMessage(recipientId,
          `На ` + date + '\n' +
          'За ' + uah[1] + ' гривен можно приобрести ' + Math.floor(usd) + ' долларов.'
        );
      });
    }

    async function usdRateFetch(msg, req) {
      const recipientId =
        msg.message.from.id === msg.message.chat.id
          ? msg.message.from.id
          : msg.message.chat.id;

      bot.sendMessage(
        recipientId,
        `Валюта: ${req[0].ccy},\nПокупка: ${req[0].buy},\nПродажа: ${req[0].sale}`,
      );
    }

    async function histUsdRate(msg, history) {
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
      const recipientId =
        msg.message.from.id === msg.message.chat.id
          ? msg.message.from.id
          : msg.message.chat.id;

      if (array.length > 0) {
        bot.sendMessage(recipientId, `История запросов: \n${array.join('\n')}`);
      } else {
        bot.sendMessage(
          recipientId,
          `История запросов пуста \nТекущий курс доллара - /usd_rate`,
        );
      }
    }

    async function terminalGlinkiSearch(msg) {
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

      const recipientId =
        msg.message.from.id === msg.message.chat.id
          ? msg.message.from.id
          : msg.message.chat.id;

      bot.sendMessage(
        recipientId,
        `Терминалы самообслуживания на улице Глинки: \n${adresses.join('\n')}`,
      );
    }

    async function terminalTitovaSearch(msg) {
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

      const recipientId =
        msg.message.from.id === msg.message.chat.id
          ? msg.message.from.id
          : msg.message.chat.id;

      bot.sendMessage(
        recipientId,
        `Терминалы самообслуживания на улице Титова: \n${adresses.join('\n')}`,
      );
    }
  }
}
