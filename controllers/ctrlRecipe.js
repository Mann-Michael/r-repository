const modelRecipe = require('../models/modelRecipe.js');

module.exports = {
	addRecipe: addRecipe, 
	addIngredient: addIngredient, 
	addInstruction: addInstruction, 
	updateRecipe: updateRecipe,
	updateIngredient: updateIngredient,
	updateInstruction: updateInstruction,
	viewRecipe: viewRecipe, 
	viewRecipeIngredients: viewRecipeIngredients, 
	viewRecipeInstructions: viewRecipeInstructions, 
	deleteRecipe: deleteRecipe, 
	deleteIngredient: deleteIngredient, 
	deleteInstruction: deleteInstruction
};

//RECIPE CONTROLLER Functions
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
	
	modelRecipe.insertRecipe(recipeName, recipeDesc, sUserId, function(error, result) {
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
	
	modelRecipe.insertIngredient(ingredientName, amount, measurementId, recipeId, function(error, result) {
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
	
	modelRecipe.insertInstruction(instructionDesc, instructionOrder, recipeId, function(error, result) {
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
	
	modelRecipe.updateRecipeById(recipeName, recipeDesc, sUserId, recipeId, function(error, result) {
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
	
	modelRecipe.updateIngredientById(ingredientName, amount, measurementId, ingredientId, function(error, result) {
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

	
	modelRecipe.updateInstructionById(instructionDesc, instructionId, function(error, result) {
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
//views recipe
//INPUT recipeId
//OUTPUT recipe information	(More info TBD)

	console.log("Viewing Recipes.");

	//Test URL
	//localhost:5000/viewRecipe?recipeId=1
	
	var recipeId = req.query.recipeId;
	console.log("Retrieving recipeId: ", recipeId);
	
	modelRecipe.getRecipeById(recipeId, function(error, result) {
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
//views recipe ingredients
//INPUT recipeId
//OUTPUT all ingredients for this recipe (More info TBD)
	
	console.log("Viewing Recipe Ingredients.");
	
	//Test URL
	//localhost:5000/viewRecipeIngredients?recipeId=1
	
	var recipeId = req.query.recipeId;
	console.log("Retrieving recipe ingredients for recipe id: ", recipeId);
	
	modelRecipe.getIngredientsByRecipeId(recipeId, function(error, result) {
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
//views recipe instruction
//INPUT recipeId
//OUTPUT all instructions for this recipe (More info TBD)
	
	console.log("Viewing Recipe Instructions.");
	
	//Test URL
	//localhost:5000/viewRecipeInstructions?recipeId=1
	
	var recipeId = req.query.recipeId;
	console.log("Retrieving recipe instructions for recipe id: ", recipeId);
	
	modelRecipe.getInstructionsByRecipeId(recipeId, function(error, result) {
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
	
	modelRecipe.deleteRecipeById(recipeId, function(error, result) {
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
	
	modelRecipe.deleteIngredientById(ingredientId, function(error, result) {
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
	
	modelRecipe.deleteInstructionById(instructionId, function(error, result) {
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
