FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app/build /app/build
COPY --from=build /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]