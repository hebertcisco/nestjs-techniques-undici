import { lastValueFrom } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-undici';

@Injectable()
export class AppService {
    constructor(private httpService: HttpService) {}
    public fetchExternalInfo = async () => {
        const baseURL = 'https://api.hotbrains.com.br';
        try {
            const result = this.httpService.request(`${baseURL}/status`);

            const response = await lastValueFrom(result);

            return response.body.json();
        } catch (error) {
            throw error;
        }
    };
    info() {
        return {
            name: 'nestjs-rest-boilerplate',
            version: '0.0.1',
            creator: 'Hebert Barros <hebert@hotbrains.com.br>',
            status: 'online',
        };
    }
}
