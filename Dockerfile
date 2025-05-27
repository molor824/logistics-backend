FROM node:23-slim

WORKDIR /app
COPY backend backend
COPY frontend frontend

RUN cd frontend && npm i && npm run build && cd ..
RUN npm i && npm run build

EXPOSE 8123
CMD ["npm", "run", "start"]
