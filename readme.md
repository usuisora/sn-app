## Getting Started
Clone repo

1) Install postgresql 
link : https://www.postgresql.org/download/windows/ .
Install last version .

 #Start intaller. Check all supplements apps . 
  #On finish it will ask to sign up. remmeber the password .

2)
type 'SQl shell' or 'psql' in search tool in PC.
Open SQL Shell .


In sql shell: 
##Server [localhost]:
##Database [postgres]:
##Port [5432]:
##Username [postgres]: 0000 //you password that you set up when install

3)Create a user with role 'me' and password = 'password' 
### `postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';`

**Note: this creadentials are passed in server/pool.js file to connect db**
### `postgres=# ALTER ROLE me CREATEDB;`

 
### `\q`


4) you quit. open SQL shell again
type: enter to submit:
##Server [localhost]:
##Database [postgres]:
##Port [5432]:
##Username [postgres]: me
##Password for user me: password

### `postgres=> CREATE DATABASE api;`

5) connect to db
### `>postgres=> \c api`
You must be connected and this terminal must be open.

## In Root folder for repo

In Terminal
### `cd server`
### `npm install`
### `npm run client-install`
Server start:
### `npm run server`

Client start
Open another terminal:
### `cd server`
### `npm run client`

call me if U stuck on 
  
### open localhost:3000:
IN BROWSER
#### enter login and password 
**you can look for them in "database/init_Database"**


### RESET DB
#### 1.Copy code from 'database/drop.sql' and enter in SQL shell .
#### 2.restart server


