[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/hebertcisco/nestjs-techniques-undici)

[![Docker Image CI](https://github.com/hebertcisco/nestjs-techniques-undici/actions/workflows/docker-image.yml/badge.svg)](https://github.com/hebertcisco/nestjs-techniques-undici/actions/workflows/docker-image.yml)

# Basic documentation

### Usage example:

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-undici';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        HttpModule.register({
            headers: {
                'my-header': `foo-bar`,
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

```ts
// app.service.ts
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
                `${baseURL}/repos/hebertcisco/undici`,
            );

            const response = await lastValueFrom(result);

            return response.body.json();
        } catch (error) {
            throw error;
        }
    };
}
```

## Environment variables

> Create a `.env` file in the root directory of your project

```dotenv
# APP CONFIGURATION
PORT=3333                  # default port to listen
NODE_ENV="development"     #development or production
```

## Runing the application with docker

### Run as dev

```sh
docker-compose up dev
```

### Run as prod

```sh
docker-compose up -d prod
```

## Runing the application with npm scrips

```sh
npm install && npm run build
```

```sh
npm run prepare:enviroment
```

### Run as dev

```sh
npm run dev
```

or

```sh
npm run dev:test
```

### Run as prod

```sh
npm run start
```

or

```sh
npm run start:prod
```
