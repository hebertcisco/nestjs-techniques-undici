import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-undici';
import crypto from 'node:crypto';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        HttpModule.register({
            headers: {
                'x-undici-test': `test_id_${crypto.randomUUID()}`,
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
