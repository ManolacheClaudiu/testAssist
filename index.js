const config = require('config');
const express = require('express');
const Joi = require('joi');
const app = express();
const logger = require('./routes/middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const users = require('./routes/users');


// app.set('view engine', 'pug');
// app.set('views', './views');

app.use(express.json());
app.use(logger);
app.use(helmet());
app.use('/api/users', users);

if (app.get('env') ==='development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled....');
}
//configf
console.log("Application Name: " + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
console.log("Mail Password: " + config.get('mail.password'));

app.use(function(req, res, next){
    console.log("authenticating");
    next();
});

//PORT
const port = process.env.PORT || 5430;
app.listen(port,()=>console.log(`listening on port ${port}...`));



const { Client } = require('pg');
var fs = require('fs');
//1 and 2
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: `password`,
  port: 5430

});
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
   
const query = `create database TestAssist`;
client
    .query(query)
    .then(res => {
        console.log('Database created');
    })
    .catch(err => {
        console.error(err);
    });
    // .finally(() => {
    //     client.end();
    // });
//4
const query1 = `
CREATE TABLE "User"(
    id uuid primary key ,
    name varchar,
    email varchar unique,
    passwordHash varchar
);
`
;

client
    .query(query1)
    .then(res => {
        console.log('Table is successfully created');
    })
    .catch(err => {
        console.error(err);
    });
    // .finally(() => {
    //     client.end();
    // });

//10

const query2 = `
CREATE TABLE "UserPreferences" (
    id uuid primary key ,
    user_id uuid,
    timezone TIME,
    country varchar,
    CONSTRAINT user_fk
   FOREIGN KEY(user_id) 
      REFERENCES "User"(id) 
)`
;

client
    .query(query2)
    .then(res => {
        console.log('Table is successfully created');
    })
    .catch(err => {
        console.error(err);
    });
    // .finally(() => {
    //     client.end();
    // });

//15

const query3 = `
CREATE TABLE "Club" (
    id uuid primary key ,
    name varchar,
    adress varchar,
    owner varchar,
    CONSTRAINT user_fk
   FOREIGN KEY(owner) 
      REFERENCES "User"(email) 
)`
;

client
    .query(query3)
    .then(res => {
        console.log('Table is successfully created');
    })
    .catch(err => {
        console.error(err);
    });
    // .finally(() => {
    //     client.end();
    // });

    