//set up db connectivity
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://dbuser:1234@localhost:5432/rrepository';
const pool = new Pool({connectionString: connectionString});

//EXPORT function

module.exports = {
	insertUser: insertUser
};

//MODEL Functions

function insertUser(req, res) {
// adds a user and password
	console.log("Adding Users.");

}
