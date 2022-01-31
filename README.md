# Softrobot Access

### Usage

This is simple backend service unabling authentifications and autorizations to a mongoDB, mainly developped using Node.js, MongoDB and the Express framework.

### Prerequisite

You should have had MongoDB user friendly interface so called MongoDB Compass and the DB management tool mongoDB Database Tools, if not visit [this page](https://www.mongodb.com/try/download/tools).

### Get started

This project uses environnement variables named .env, you should have it at the root of your project.
Should you have nodemon globaly installed (recommended if you are a developer to install globaly this package), to start your project in local run:

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

The access to the database is secured as well shown is the database's connection string, to get access in shell you should read the .yml docker-compose file and for further manipulations please refer to [this](ttps://docs.mongodb.com/manual/reference/mongo-shell/). To be able to manage the database:

Get in the bash of the mongodb container

```
$ sudo docker exec -it mongodb bash
```

Run

```
# mongo
```

Switch the databse to be on admin database

```
> use admin
```

Authenticate yourself

```
db.auth("MONGO_INITDB_ROOT_USERNAME","MONGO_INITDB_ROOT_PASSWORD") (MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD from docker-compose.yml)
```

Once all that is okay, you are ready to manage the database in shell mode

#### Backup the DB

To backup the database, get in the mongodb image by `$ sudo docker exec -it mongodb bash` then run:

```
$ mongodump --uri="mongodb://MONGO_INITDB_ROOT_USERNAME:MONGO_INITDB_ROOT_PASSWORD@127.0.0.1:27017/?authSource=admin"
```

Your dump file is now on the container, you should copy it on your server via:

```
$ sudo docker cp mongodb:dump "/where_to_store_your_backup"
```

#### Restore the DB

Get in the mongodb image by `$ sudo docker exec -it mongodb bash` then run:

```
mongorestore --db wished_db_name /path_to_folder_holding_db_collections
```

### Data manipulation

We recommend installing [postman](https://www.postman.com/downloads/) app if you doon't have it yet and import the json file

```
Softrobot Backend.postman_collection.json
```

located at the root of the project. You'll have in it the requests allowing you fill the database or test the developed services.
