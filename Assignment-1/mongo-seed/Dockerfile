FROM mongo:latest

COPY seeders/articles.json articles.json
COPY seeders/comments.json comments.json
COPY seeders/posts.json posts.json
COPY seeders/users.json users.json

CMD mongoimport --host=mongo --db=fear-of-flight-db --collection=articles --type=json --file=articles.json --jsonArray
CMD mongoimport --host=mongo --db=fear-of-flight-db --collection=comments --type=json --file=comments.json --jsonArray
CMD mongoimport --host=mongo --db=fear-of-flight-db --collection=posts --type=json --file=posts.json --jsonArray
CMD mongoimport --host=mongo --db=fear-of-flight-db --collection=users --type=json --file=users.json --jsonArray