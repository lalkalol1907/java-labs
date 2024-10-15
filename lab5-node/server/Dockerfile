FROM node:latest

COPY . .
RUN npm i
RUN npm run build

ENTRYPOINT ["node", "./dist/index"]