FROM node:slim

WORKDIR /app

COPY package.json .

# RUN npm install
RUN npm install -g nodemon && npm install

#install depedency

RUN npm install --save knex mysql2 jsonwebtoken bcrypt @fastify/helmet @fastify/cors @fastify/formbody @fastify/multipart dotenv ajv

RUN npm audit fix --force

COPY . .

EXPOSE 3000

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]
# CMD [ "npm", "start" ]