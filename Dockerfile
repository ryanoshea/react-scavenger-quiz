FROM node:12-alpine AS builder
WORKDIR /app
COPY . .

RUN npm i --force -g yarn
RUN yarn
RUN yarn build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
