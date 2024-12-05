import { lastValueFrom } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-undici';

@Injectable()
export class AppService {
    constructor(private httpService: HttpService) {}

    public fetchExternalInfo = async () => {
        const baseURL = 'https://api.github.com';
        try {
            const result = this.httpService.request(
                `${baseURL}/repos/hebertcisco/nestjs-undici`,
            );

            const response = await lastValueFrom(result);

            return response.body.json();
        } catch (error) {
            throw error;
        }
    };
    public info() {
        return {
            name: 'nestjs-rest-boilerplate',
            version: '0.0.1',
        };
    }
}
