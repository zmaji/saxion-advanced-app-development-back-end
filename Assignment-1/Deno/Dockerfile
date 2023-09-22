FROM denoland/deno:latest

WORKDIR /app

COPY . .
RUN deno cache deps.ts

EXPOSE 8000

CMD ["run", "--allow-net", "--allow-env", "main.ts"]