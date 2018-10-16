//Searching Famous People

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

knex.select().from('famous_people')
  .where(knex.raw('?? = ?', ['first_name', process.argv[2]]))
  .asCallback(function(err, rows) {
  if (err) {
    return console.error(err);
  }

  function parseDate(date) {
    const dateString = date.toString();
    const dateArray = dateString.split(" ");
    return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
  }

  for (let i = 0; i < rows.length; i++) {
    console.log(`- ${rows[i].first_name} ${rows[i].last_name} born '${parseDate(rows[i].birthdate)}'`);
  }

  knex.destroy();
});
