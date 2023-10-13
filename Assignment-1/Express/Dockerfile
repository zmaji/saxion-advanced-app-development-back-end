FROM node:latest

RUN apt-get update && apt-get install -y wget
RUN wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
RUN dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
RUN apt-get install -f  # This is to ensure any dependencies are also installed

COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
RUN npm install
COPY ./. .
EXPOSE 3000/tcp
EXPOSE 3000/udp
ENV NODE_OPTIONS="--max-old-space-size=4096"

CMD npm run start