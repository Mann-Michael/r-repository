// general variables
var express = require('express');
var app = express();

//set up db connectivity
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://dbuser:1234@localhost:5432/rrepository';
const pool = new Pool({connectionString: connectionString});

//app variables
app.use(express.static(__dirname + '/public'));
app.set("port", (process.env.PORT || 5000));

//Set up routes
app.get('/addUser', addUser);
app.get('/addRecipe', addRecipe);
app.get('/addIngredient', addIngredient);
app.get('/addInstruction', addInstruction);
app.get('/updateRecipe', updateRecipe);
app.get('/updateIngredient', updateIngredient);
app.get('/updateInstruction', updateInstruction);
app.get('/viewRecipe', viewRecipe);
app.get('/viewRecipeIngredients', viewRecipeIngredients);
app.get('/viewRecipeInstructions', viewRecipeInstructions);
app.get('/deleteRecipe', deleteRecipe);
app.get('/deleteIngredient', deleteIngredient);
app.get('/deleteInstruction', deleteInstruction);
app.get('/viewMenu', viewMenu);

//function to state that the server is running
app.listen(app.get('port'), function() {
	console.log('Node app is running on port: ', app.get('port'));
});

// routing functions
function addUser(req, res) {
// adds a user and password
	console.log("Adding Users.");

}

function addRecipe(req, res) {
//adds a brand new recipe
//INPUT recipeName, recipeDesc, sUserId
//OUTPUT recipe_id

	console.log("Adding Recipe.");
	
	//Test URL
	//localhost:5000/addRecipe?recipeName=Water&recipeDesc=Water&sUserId=1
	//QUERY to erase test data
	//DELETE FROM recipe WHERE recipe_name = 'Water';
	
	var recipeName = req.query.recipeName;
	var recipeDesc = req.query.recipeDesc;
	var sUserId = req.query.sUserId;
	
	insertRecipe(recipeName, recipeDesc, sUserId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Inserted Correctly');
			res.json(result[0]);
		}
	});	
}

function addIngredient(req, res) {
//adds a brand new ingredient to a recipe
//INPUT ingredientName, amount, measurementId, recipeId
//OUTPUT recipe_id

	console.log("Adding Recipe Ingredient.");
	
	//Test URL
	//localhost:5000/addIngredient?ingredientName=Water&amount=1&measurementId=1&recipeId=20
	//QUERY to erase test data
	//DELETE FROM ingredient WHERE ingredient_name = 'Water';
	
	var ingredientName = req.query.ingredientName;
	var amount = req.query.amount;
	var measurementId = req.query.measurementId;
	var recipeId = req.query.recipeId;
	
	insertIngredient(ingredientName, amount, measurementId, recipeId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Inserted Correctly');
			res.json(result[0]);
		}
	});	
}

function addInstruction(req, res) {
//adds a brand new instruction to a recipe
//INPUT instructionDesc, instructionOrder, recipeId 
//OUTPUT recipe_id

	console.log("Adding Recipe Instruction.");
	
	//Test URL
	//localhost:5000/addInstruction?instructionDesc=Pour%20Water&instructionOrder=1&recipeId=20
	//QUERY to erase test data
	//DELETE FROM instruction WHERE instruction_desc = 'Pour Water';
	
	var instructionDesc = req.query.instructionDesc;
	var instructionOrder = req.query.instructionOrder;
	var recipeId = req.query.recipeId;
	
	insertInstruction(instructionDesc, instructionOrder, recipeId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Inserted Correctly');
			res.json(result[0]);
		}
	});
}

function updateRecipe(req, res) {
//updates an existing recipe
//INPUT recipeId, recipeName, recipeDesc, sUserId
//OUTPUT recipe_id

	console.log("Updating Recipe.");
	
	//Test URL
	//localhost:5000/updateRecipe?recipeId=20&recipeName=Water&recipeDesc=Water&sUserId=2
	
	var recipeId = req.query.recipeId;
	var recipeName = req.query.recipeName;
	var recipeDesc = req.query.recipeDesc;
	var sUserId = req.query.sUserId;
	
	updateRecipeById(recipeName, recipeDesc, sUserId, recipeId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Updated Correctly');
			res.json(result[0]);
		}
	});	
}

function updateIngredient(req, res) {
//updates an existing ingredient
//INPUT ingredientId, ingredientName, amount, measurementId
//OUTPUT recipe_id

	console.log("Updating Ingredient.");
	
	//Test URL
	//localhost:5000/updateIngredient?ingredientId=14&ingredientName=Water&amount=10&measurementId=1
	
	var ingredientId = req.query.ingredientId;
	var ingredientName = req.query.ingredientName;
	var amount = req.query.amount;
	var measurementId = req.query.measurementId;
	
	updateIngredientById(ingredientName, amount, measurementId, ingredientId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Updated Correctly');
			res.json(result[0]);
		}
	});
}

function updateInstruction(req, res) {
//updates an existing instruction
//INPUT instructionId, instructionDesc
//OUTPUT recipe_id

	console.log("Updating Instruction.");
	
	//Test URL
	//localhost:5000/updateInstruction?instructionId=13&instructionDesc=Pour%20big%20water
	
	var instructionId = req.query.instructionId;
	var instructionDesc = req.query.instructionDesc;

	
	updateInstructionById(instructionDesc, instructionId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Updated Correctly');
			res.json(result[0]);
		}
	});
}

function viewRecipe(req, res) {
	
	console.log("Viewing Recipes.");
	var recipeId = req.query.recipeId;
	console.log("Retrieving recipeId: ", recipeId);
	
	getRecipeById(recipeId, function(error, result) {
		//check for errors
		if (error || result == null || result.length != 1){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			res.json(result[0]);
		}
	});
}

function viewRecipeIngredients(req, res) {
	
	console.log("Viewing Recipe Ingredients.");
	var id = req.query.id;
	console.log("Retrieving recipe ingredients for recipe id: ", id);
	
	getIngredientsByRecipeId(id, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			res.json(result);
		}
	});
}

function viewRecipeInstructions(req, res) {
	
	console.log("Viewing Recipe Instructions.");
	var id = req.query.id;
	console.log("Retrieving recipe instructions for recipe id: ", id);
	
	getInstructionsByRecipeId(id, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			res.json(result);
		}
	});
}

function deleteRecipe(req, res) {
//deletes an existing recipe
//INPUT recipeId
//OUTPUT recipe_id

	console.log("Deleting Recipe.");
	
	//Test URL
	//localhost:5000/deleteRecipe?recipeId=21
	//localhost:5000/addRecipe?recipeName=Water&recipeDesc=Water&sUserId=1
	
	var recipeId = req.query.recipeId;
	
	deleteRecipeById(recipeId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Deleted Correctly');
			res.json(result[0]);
		}
	});;
}

function deleteIngredient(req, res) {
//deletes an existing ingredient
//INPUT ingredientId
//OUTPUT recipe_id

	console.log("Deleting Ingredient.");
	
	//Test URL
	//localhost:5000/deleteIngredient?ingredientId=15
	//localhost:5000/addIngredient?ingredientName=Water&amount=1&measurementId=1&recipeId=20
	
	var ingredientId = req.query.ingredientId;
	
	deleteIngredientById(ingredientId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Deleted Correctly');
			res.json(result[0]);
		}
	});;
}

function deleteInstruction(req, res) {
//deletes an existing instruction
//INPUT instructionId
//OUTPUT recipe_id

	console.log("Deleting Instruction.");
	
	//Test URL
	//localhost:5000/deleteInstruction?instructionId=15
	//localhost:5000/addInstruction?instructionDesc=Pour%20Water&instructionOrder=1&recipeId=20
	
	var instructionId = req.query.instructionId;
	
	deleteInstructionById(instructionId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Deleted Correctly');
			res.json(result[0]);
		}
	});;

}

function viewMenu(req, res) {
	
	console.log("Viewing Menu.");

}

// worker bee functions

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
	
	var sql = "SELECT ingredient.ingredient_name, ingredient.amount, measurement.measurement_name FROM ingredient INNER JOIN measurement ON measurement.measurement_id = ingredient.measurement_id WHERE recipe_id = $1::int;";
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

