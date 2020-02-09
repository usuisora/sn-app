## Getting Started

1) Install postgresql 
link : https://www.postgresql.org/download/windows/ .
Install last version .

 #Start intaller. Check all supplements apps . 
  #On finish it will ask to sign up. remmeber the password .

2)
type 'SQl shell' or 'psql' in search tool.
Open SQL Shell .


In sql shell: 
##Server [localhost]:
##Database [postgres]:
##Port [5432]:
##Username [postgres]: 0000 //you password that you set up when install

3)Create a user

postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';
postgres=# ALTER ROLE me CREATEDB;
postgres=# \q
'enter'

4) you quit. open SQL shell again
type: 
##Server [localhost]:
##Database [postgres]:
##Port [5432]:
##Username [postgres]: me
##Password for user me: password

postgres=> CREATE DATABASE api;

5) connect to db
>postgres=> \c api
You must be connected and this terminal must be open.

6) git clone repository 


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
  
##open localhost:3000:

enter login and password 
you can look for them in "database/init_Database"



to drop db the code from drop.sql and enter in power shell 
then go to where the server running and restart.

