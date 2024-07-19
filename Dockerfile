FROM node:16
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
ENV NODE_ENV=development
CMD ["node", "dist/main"]