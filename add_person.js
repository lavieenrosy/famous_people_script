//Inserting Famous People

const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host :      settings.hostname,
    user :      settings.user,
    password :  settings.password,
    database :  settings.database,
  //searchPath: ['knex', 'public']
  }
});

knex('famous_people')
  .insert({first_name: process.argv[2], last_name: process.argv[3], birthdate: process.argv[4]})
  .asCallback(function(err) {
  if (err) {
    return console.error(err);
  }
  knex.destroy();
});
