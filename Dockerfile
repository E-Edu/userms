FROM node:latest AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm dedupe
RUN npm install
COPY . .
RUN npm run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:14.2.0-alpine
ENV DATABASE_HOSTNAME=postgres
ENV DATABASE_PORT=5432
ENV DATABASE_USERNAME=postgres
ENV DATABASE_PASSWORD=mysecretpassword
ENV DATABASE_DATABASE=gewia

ENV JWT_SECRET=secretKey
ENV JWT_EXPIRESIN=15m
ENV JWT_ISSUER=userms
ENV JWT_ALGORITHEM=HS512

ENV INFLUX_ENABLED=false

ENV SESSION_SECRET=test
ENV SERVICE_SECRET=test

WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
