FROM node:16.16.0-alpine
RUN apk add curl
WORKDIR /app
COPY next.config.js ./
COPY public ./public
COPY .next ./.next
COPY dist ./dist
COPY cert ./cert
COPY loader.ts ./loader.ts
COPY node_modules ./node_modules
COPY package.json .
COPY .env.staging ./.env.staging
EXPOSE 3000
CMD [ "yarn", "start" ]
