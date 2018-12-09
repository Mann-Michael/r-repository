//set up db connectivity
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://dbuser:1234@localhost:5432/rrepository';
const pool = new Pool({connectionString: connectionString});

//EXPORT function

module.exports = {
	getRecipeBySUserId: getRecipeBySUserId, 
	getRecipeAndInstructionsBySUserId: getRecipeAndInstructionsBySUserId
};

//MENU MODEL Functions

function getRecipeBySUserId(sUserId, callback) {
	console.log('Get recipe ids from db with sUserId:', sUserId);
	
	var sql = "SELECT recipe_id, recipe_name, recipe_desc, s_user_id FROM recipe WHERE s_user_id = $1::int";
	var params = [sUserId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
	
	console.log('Found DB result: ' + JSON.stringify(result.rows));
	
	callback(null, result.rows);
	});
}

function getRecipeAndInstructionsBySUserId(sUserId, callback) {
	console.log('Get recipe ids from db with sUserId:', sUserId);
	
	var sql = "SELECT recipe.recipe_id, recipe.recipe_name, recipe. recipe_desc, recipe.s_user_id,	instruction.instruction_desc, instruction.instruction_order FROM recipe INNER JOIN instruction ON recipe.recipe_id = instruction.recipe_id WHERE s_user_id = $1::int ORDER BY recipe.recipe_id, instruction.instruction_order";
	var params = [sUserId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
	
	console.log('Found DB result: ' + JSON.stringify(result.rows));
	
	callback(null, result.rows);
	});
}




















