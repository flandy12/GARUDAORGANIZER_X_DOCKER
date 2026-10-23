FROM node:20-alpine

WORKDIR /app
RUN chown node:node /app

USER node

# Gunakan instalasi standar package.json. `npm install` juga akan
# menyelaraskan package-lock.json jika metadata lock berbeda.
COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

ENV HOST=0.0.0.0 \
    PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
