//set up db connectivity
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://dbuser:1234@localhost:5432/rrepository';
const pool = new Pool({connectionString: connectionString});

//EXPORT function

module.exports = {
	insertRecipe: insertRecipe, 
	insertIngredient: insertIngredient, 
	insertInstruction: insertInstruction, 
	updateRecipeById: updateRecipeById,
	updateIngredientById: updateIngredientById, 
	updateInstructionById: updateInstructionById, 
	getRecipeById: getRecipeById, 
	getIngredientsByRecipeId: getIngredientsByRecipeId,
	getInstructionsByRecipeId: getInstructionsByRecipeId, 
	deleteRecipeById: deleteRecipeById, 
	deleteIngredientById: deleteIngredientById, 
	deleteInstructionById: deleteInstructionById
};

//MODEL Functions
function insertRecipe(recipeName, recipeDesc, sUserId, callback) {
	console.log('insert recipe to db with recipeName: ', recipeName, ' recipeDesc: ', recipeDesc, ' and sUserId: ', sUserId);
	
	var sql = "INSERT INTO recipe (recipe_name, recipe_desc, s_user_id) VALUES ($1::text, $2::text, $3::int) RETURNING recipe_id";
	var params = [recipeName, recipeDesc, sUserId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
		
	console.log('Inserted DB result');
	
	callback(null, result.rows);
	});
}

function insertIngredient(ingredientName, amount, measurementId, recipeId, callback) {
	console.log('insert ingredient to db with ingredientName: ', ingredientName, ' amount: ', amount, ' measurementId: ', measurementId, 'and recipeId: ', recipeId);
	
	var sql = "INSERT INTO ingredient (ingredient_name, amount, measurement_id, recipe_id) VALUES( $1::text, $2::int, $3::int, $4::int) RETURNING recipe_id";
	var params = [ingredientName, amount, measurementId, recipeId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
		
	console.log('Inserted DB result');
	
	callback(null, result.rows);
	});
}

function insertInstruction(instructionDesc, instructionOrder, recipeId, callback) {
	console.log('insert instruction to db with instructionDesc: ', instructionDesc, ' instructionOrder: ', instructionOrder, 'and recipeId: ', recipeId);
	
	var sql = "INSERT INTO instruction (instruction_desc, instruction_order, recipe_id) VALUES ( $1::text, $2::int, $3::int) RETURNING recipe_id";
	var params = [instructionDesc, instructionOrder, recipeId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
		
	console.log('Inserted DB result');
	
	callback(null, result.rows);
	});
}

function updateRecipeById(recipeName, recipeDesc, sUserId, recipeId, callback) {
	console.log('update recipe with recipeId: ', recipeId, ' recipeName: ', recipeName, ' recipeDesc: ', recipeDesc, ' and sUserId: ', sUserId);
	
	var sql = "UPDATE recipe SET recipe_name = $1::text, recipe_desc = $2::text, s_user_id = $3::int WHERE recipe_id = $4::int RETURNING recipe_id";
	var params = [recipeName, recipeDesc, sUserId, recipeId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
		
	console.log('Updated DB result');
	
	callback(null, result.rows);
	});
}

function updateIngredientById(ingredientName, amount, measurementId, ingredientId, callback) {
	console.log('update recipe with ingredientName: ', ingredientName, ' amount: ', amount, ' measurementId: ', measurementId, ' and ingredientId: ', ingredientId);
	
	var sql = "UPDATE ingredient SET ingredient_name = $1::text, amount = $2::int, measurement_id = $3::int WHERE ingredient_id = $4::int RETURNING recipe_id";
	var params = [ingredientName, amount, measurementId, ingredientId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
		
	console.log('Updated DB result');
	
	callback(null, result.rows);
	});
}

function updateInstructionById(instructionDesc, instructionId, callback) {
	console.log('update recipe with instructionDesc: ', instructionDesc, ' instructionId: ', instructionId);
	
	var sql = "UPDATE instruction SET instruction_desc = $1::text WHERE instruction_id = $2::int RETURNING recipe_id";
	var params = [instructionDesc, instructionId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
		
	console.log('Updated DB result');
	
	callback(null, result.rows);
	});
}

function getRecipeById(recipeId, callback) {
	console.log('Get recipe from db with recipeId:', recipeId);
	
	var sql = "SELECT recipe_name, recipe_desc, s_user_id FROM recipe WHERE recipe_id = $1::int";
	var params = [recipeId];
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

function getIngredientsByRecipeId(recipeId, callback) {
	console.log('get recipe ingredients from db with recipeId:', recipeId);
	
	var sql = "SELECT ingredient.ingredient_name, ingredient.amount, measurement.measurement_name, ingredient.recipe_id FROM ingredient LEFT JOIN measurement ON measurement.measurement_id = ingredient.measurement_id WHERE recipe_id = $1::int";
	var params = [recipeId];
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

function getInstructionsByRecipeId(recipeId, callback) {
	console.log('get recipe instructions from db with recipeId:', recipeId);
	
	var sql = "SELECT instruction_order, instruction_desc FROM instruction WHERE recipe_id = $1::int ORDER BY instruction_order ASC;";
	var params = [recipeId];
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

function deleteRecipeById(recipeId, callback) {
	console.log('delete recipe with recipeId: ', recipeId);
	
	var sql = "DELETE FROM recipe WHERE recipe_id = $1::int RETURNING recipe_id";
	var params = [recipeId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
		
	console.log('Deleted DB result');
	
	callback(null, result.rows);
	});
}

function deleteIngredientById(ingredientId, callback) {
	console.log('update ingredient with ingredientId: ', ingredientId);
	
	var sql = "DELETE FROM ingredient WHERE ingredient_id = $1::int RETURNING recipe_id";
	var params = [ingredientId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
		
	console.log('Deleted DB result');
	
	callback(null, result.rows);
	});
}

function deleteInstructionById(instructionId, callback) {
	console.log('update instruction with instructionId: ', instructionId);
	
	var sql = "DELETE FROM instruction WHERE instruction_id = $1::int RETURNING recipe_id";
	var params = [instructionId];
	pool.query(sql, params, function(err, result){
		if(err)  {
			console.log('An error with the DB occured');
			console.log(err);
			callback(err, null);
		}
		
	console.log('Deleted DB result');
	
	callback(null, result.rows);
	});
}

