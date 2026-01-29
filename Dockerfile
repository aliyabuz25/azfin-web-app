# Build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/server ./server

# Create initial data files if they don't exist
RUN echo "[]" > requests.json && \
    mkdir -p uploads

EXPOSE 5001
CMD ["node", "server/index.js"]
