FROM node:22.11.0-alpine3.20 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob npm@10.9.2
RUN npm install glob rimraf
RUN npm install -g @nestjs/cli

RUN npm install --save-dev @types/node
RUN npm install

COPY . .

RUN npm run build

FROM node:22.11.0-alpine3.20 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob npm@10.9.2
RUN npm install glob rimraf
RUN npm install -g @nestjs/cli

RUN npm install --save-dev @types/node
RUN npm install

COPY . .

RUN npm run build

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]