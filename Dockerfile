FROM node:22-alpine as builder

WORKDIR /app

COPY package.json .
RUN  npm install --omit=dev

COPY . .

RUN npm run build

FROM node:22-alpine as production
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]