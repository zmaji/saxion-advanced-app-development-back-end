FROM denoland/deno:latest

WORKDIR /app

COPY ./ ./
RUN deno cache ./main.ts

CMD ["run", "--allow-net", "main.ts"]