# Multi-stage build for React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/supplychain-frontend/package*.json ./
RUN npm install
COPY frontend/supplychain-frontend/ ./
RUN npm run build

# Node.js backend
FROM node:18-alpine AS backend
WORKDIR /app
COPY backend-node/package*.json ./
RUN npm install
COPY backend-node/ ./
COPY --from=frontend-build /app/frontend/build ./public

EXPOSE 5000
CMD ["npm", "start"]