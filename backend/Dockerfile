FROM node:18.19.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

VOLUME "/app/DATA"

CMD ["yarn", "start"]
