FROM node:slim

# Bundle app source
COPY . .

RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]