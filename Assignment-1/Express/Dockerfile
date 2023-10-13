FROM node:latest
RUN apt-get update && apt-get install
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
RUN npm install
COPY ./. .
EXPOSE 3000/tcp
EXPOSE 3000/udp
ENV NODE_OPTIONS="--max-old-space-size=4096"

CMD npm run start