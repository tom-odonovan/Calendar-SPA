const pg = require('pg')

const db = new pg.Pool({
    database: "calendar_project",
});



module.exports = db;