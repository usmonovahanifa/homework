FROM node:20-alpine
COPY ./ ./
WORKDIR /
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start:dev"]