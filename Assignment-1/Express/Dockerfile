FROM node:latest
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
RUN npm install
COPY ./. .
EXPOSE 3000/tcp
EXPOSE 3000/udp
CMD npm run start