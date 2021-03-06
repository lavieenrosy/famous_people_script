const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

client.query('SELECT * FROM famous_people WHERE first_name = $1', [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err)
    }

    function parseDate(date) {
      const dateString = date.toString();
      const dateArray = dateString.split(" ");
      return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
    }

    for (let i = 0; i < result.rows.length; i++) {
      console.log(`- ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${parseDate(result.rows[i].birthdate)}'`);
    }
    client.end();
  });
});