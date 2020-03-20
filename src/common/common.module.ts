import { Module, Logger } from '@nestjs/common';

import { ConfigService } from './config.service';

@Module({
    providers: [
        { provide: Logger, useValue: new Logger() },
        { provide: ConfigService, useValue: new ConfigService() },
    ],
    exports: [Logger, ConfigService],
})
export class CommonModule { }