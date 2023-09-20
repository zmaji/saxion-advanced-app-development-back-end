FROM mongo:latest

WORKDIR /app

COPY Seeds/ /app/Seeds

CMD mongoimport --host=mongo --db fear-of-flight-db --type=json --dir=/app/Seeds --jsonArray