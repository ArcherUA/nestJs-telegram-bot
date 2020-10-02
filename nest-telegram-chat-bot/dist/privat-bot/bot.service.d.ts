import { UsdRateArchive } from '../common/entities/usd-rate-aarchive.entity';
import { Repository } from 'typeorm/index';
export declare class BotService {
    protected readonly usdRateArchiveRepository: Repository<UsdRateArchive>;
    constructor(usdRateArchiveRepository: Repository<UsdRateArchive>);
    botMessage(): Promise<void>;
}
