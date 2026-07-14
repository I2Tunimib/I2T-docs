FROM node:22-alpine

RUN addgroup -S mcp && adduser -S mcp -G mcp

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

COPY index.js ./

USER mcp
EXPOSE 3000

CMD ["node", "index.js"]
