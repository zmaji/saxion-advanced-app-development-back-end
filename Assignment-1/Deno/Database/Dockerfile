FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=myrootpassword
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=myusername
ENV MYSQL_PASSWORD=mypassword

COPY ./Database/init.sql /docker-entrypoint-initdb.d/