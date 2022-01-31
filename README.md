# Softrobot Access

### Usage

This is simple backend service unabling authentifications and autorizations to a mongoDB, mainly developped using Node.js, MongoDB and the Express framework.

### Get started

This project uses environnement variables named .env, you should have it at the root of your project.
Should you have nodemon globaly installed (recommended if you are a developer), to start your project in local run:

```
nodemon
```

Otherwise run:

```
node app.js
```

### Deployment

For stagging and productioon state, this project has configuration allowing you to docker containerize it and link to a docker mongoDB container, the orchestration method then depends on you (swarm, kubbernets ...).
Once your changes are commitend and pushed, (as for now we don't have runners on gitlab) ssh connect to your server then:

- clone/pull the project
- run `$ sudo PORT=PORT_NUMBER docker-compose up -d [optional arguments]`
- run `sudo docker container ls` and look for the status of mongodb and softrobot_access

When all that is okay, your authentification and autorization service is ready of use.

### Security on deployment

The access to the database is secured as well shown is the database's connection string, to get access in shell you should read the .yml docker-compose file and for further manipulations please refer to https://docs.mongodb.com/manual/reference/mongo-shell/. To be able to manage the database:

- $ sudo docker exec -it mongodb bash (Meaning that you would like to get in the bash of the mongodb container)
- # mongo
- > use admin
- db.auth("MONGO_INITDB_ROOT_USERNAME","MONGO_INITDB_ROOT_PASSWORD") (MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD from docker-compose.yml)
  Once all is okay, you are ready to manage the database in shell mode

#### Backup the DB

To backup the database, get in the mongodb image by `$ sudo docker exec -it mongodb bash` then run:

- mongodump --uri="mongodb://MONGO_INITDB_ROOT_USERNAME:MONGO_INITDB_ROOT_PASSWORD@127.0.0.1:27017/?authSource=admin"

Your dump file is now on the container, you should copy it on your server via:

- $ sudo docker cp mongodb:dump "/where_to_store_your_backup"

#### Restore the DB

Get in the mongodb image by `$ sudo docker exec -it mongodb bash` then run:

- mongorestore --db wished_db_name /path_to_folder_holding_db_collections

### For what it worths

Local mongodb security setting:

Enter in shell mode and run the commands:

> mongo
> use admin
> db.createUser(
> {

    user: "Yacine",
    pwd:  passwordPrompt(),   // or cleartext password
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase"]

}
)
Open mongod.conf and enable

> security:

    authentification: enabled

Local mongodb secured connection in shell:
db.auth("Yacine","SQenvi5\*")

Connection string:
`mongodb://${process.env.USERNAME_CONNEXION_DB}:${process.env.PASS_CONNEXION_DB}@${process.env.MONGODB_ADDR}:27017/softrobot?authSource=admin`
