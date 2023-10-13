FROM node:latest
RUN wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
RUN apt-get install -y libssl1.1_1.1.1f-1ubuntu2_amd64.deb
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
RUN npm install
COPY ./. .
EXPOSE 3000/tcp
EXPOSE 3000/udp
ENV NODE_OPTIONS="--max-old-space-size=4096"

CMD npm run start