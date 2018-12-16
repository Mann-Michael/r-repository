const modelRecipe = require('../models/modelRecipe.js');

module.exports = {
	addRecipe: addRecipe, 
	addCompleteRecipe: addCompleteRecipe, 
	addIngredient: addIngredient, 
	addInstruction: addInstruction, 
	updateRecipe: updateRecipe,
	updateCompleteRecipe: updateCompleteRecipe,
	updateIngredient: updateIngredient,
	updateInstruction: updateInstruction,
	viewRecipe: viewRecipe, 
	viewCompleteRecipe: viewCompleteRecipe, 
	viewRecipesBySUserId: viewRecipesBySUserId, 
	viewRecipeIngredients: viewRecipeIngredients, 
	viewRecipeInstructions: viewRecipeInstructions, 
	deleteRecipe: deleteRecipe, 
	deleteCompleteRecipe: deleteCompleteRecipe,
	deleteIngredient: deleteIngredient, 
	deleteInstruction: deleteInstruction, 
	deleteIngredientsByRId: deleteIngredientsByRId, 
	deleteInstructionsByRId: deleteInstructionsByRId
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

function addCompleteRecipe(req, res) {
//adds a brand new recipe with ingredients, and instructions
//INPUT recipeName, recipeDesc, sUserId
//OUTPUT recipe_id

	console.log("Adding Complete Recipe.");
	
	//Test URL
	//localhost:5000/addCompleteRecipe?recipeName=Water&recipeDesc=Water&sUserId=1
	//QUERY to erase test data
	//DELETE FROM recipe WHERE recipe_name = 'Water';
	
	//var completeRecipe = req.body.recipe;
	
	console.log(req.body);
	//Recipe Add
	var recipeName = req.body.recipeName;
	var recipeDesc = req.body.recipeDesc;
	//hook this up differently when login works
	var sUserId = 3;
	var recipeIdCurrent;
	
	modelRecipe.insertRecipe(recipeName, recipeDesc, sUserId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Inserted Correctly');
			//res.json(result[0]);
			console.log(result[0]);
			recipeIdCurrent = result[0].recipe_id;
			console.log(recipeIdCurrent);
			
			//The Great Ingredients Add Experiment
			req.body.ingredients.forEach(function(value) {
				var ingredientName = value.ingredientName;
				var amount = value.amount;
				var measurementId = value.measurementId;
				var recipeId = recipeIdCurrent;
				console.log(recipeId);
				
				modelRecipe.insertIngredient(ingredientName, amount, measurementId, recipeId, function(error, result) {
					//check for errors
					if (error || result == null){
						res.status(500).json({success:false, data: error});
					} else {
						//without errors, print data
						console.log('Inserted Ingredient Correctly');
					}
				});	
			});

			req.body.instructions.forEach(function(value) {
				var instructionDesc = value.instructionDesc;
				var instructionOrder = value.instructionOrder;
				var recipeId = recipeIdCurrent;
				
				modelRecipe.insertInstruction(instructionDesc, instructionOrder, recipeId, function(error, result) {
					//check for errors
					if (error || result == null){
						res.status(500).json({success:false, data: error});
					} else {
						//without errors, print data
						console.log('Inserted Instruction Correctly');
						//res.json(result[0]);
					}
				});
			});
			
			//The end of the experiment!!!
			
			/*//Ingredients Add Original
			req.body.ingredients.forEach(function(value) {
				var ingredientName = value.ingredientName;
				var amount = value.amount;
				var measurementId = value.measurementId;
				var recipeId = recipeIdCurrent;
				console.log(recipeId);
				
				modelRecipe.insertIngredient(ingredientName, amount, measurementId, recipeId, function(error, result) {
					//check for errors
					if (error || result == null){
						res.status(500).json({success:false, data: error});
					} else {
						//without errors, print data
						console.log('Inserted Correctly');
						//res.json(result[0]);
						
						req.body.instructions.forEach(function(value) {
							var instructionDesc = value.instructionDesc;
							var instructionOrder = value.instructionOrder;
							var recipeId = recipeIdCurrent;
							
							modelRecipe.insertInstruction(instructionDesc, instructionOrder, recipeId, function(error, result) {
								//check for errors
								if (error || result == null){
									res.status(500).json({success:false, data: error});
								} else {
									//without errors, print data
									console.log('Inserted Correctly');
									//res.json(result[0]);
								}
							});
						});
					}
				});	
			});*/
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

function updateCompleteRecipe(req, res) {
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

function viewCompleteRecipe(req, res) {
	
	//gets recipe, instructions, and ingredients
	//INPUT recipeId
	//OUTPUT completeRecipe array

	console.log("Viewing Complete Recipe.");
	
	//Recipe View
	var recipeId = req.query.recipeId;
	var completeRecipe;
	//This is hardcoded because login was cut
	var sUserId = 3;
	//var recipeIdCurrent;

	//build completeRecipe array
	modelRecipe.getRecipeById( recipeId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			recipeName = result[0].recipe_name;
			recipeDesc = result[0].recipe_desc;
			completeRecipe = {
				recipeName: recipeName,
				recipeDesc: recipeDesc,
				ingredients: [],
				instructions: []
			}; 
			//without errors, print data
			console.log(completeRecipe);
			
			//The Great Ingredients Add Experiment
			req.body.ingredients.forEach(function(value) {
				var ingredientName = value.ingredientName;
				var amount = value.amount;
				var measurementId = value.measurementId;
				var recipeId = recipeIdCurrent;
				console.log(recipeId);
				
				modelRecipe.insertIngredient(ingredientName, amount, measurementId, recipeId, function(error, result) {
					//check for errors
					if (error || result == null){
						res.status(500).json({success:false, data: error});
					} else {
						//without errors, print data
						console.log('Inserted Ingredient Correctly');
					}
				});	
			});

			req.body.instructions.forEach(function(value) {
				var instructionDesc = value.instructionDesc;
				var instructionOrder = value.instructionOrder;
				var recipeId = recipeIdCurrent;
				
				modelRecipe.insertInstruction(instructionDesc, instructionOrder, recipeId, function(error, result) {
					//check for errors
					if (error || result == null){
						res.status(500).json({success:false, data: error});
					} else {
						//without errors, print data
						console.log('Inserted Instruction Correctly');
						//res.json(result[0]);
					}
				});
			});
			
			
			
		}
	});

/*
	//Dump ingredients info in an array
	function arrayIngredientsConstructor() {
		var inputsName = document.getElementsByClassName('ingredientName');
		var inputsAmount = document.getElementsByClassName('amount');
		var inputsMeasurement = document.getElementsByClassName('measurementId');
		
		for (var i = 0; i < inputsName.length; i++) {
			var ingName = inputsName[i].value;
			var ingAmount = inputsAmount[i].value;
			var ingMeasurement = inputsMeasurement[i].value;			
			completeRecipe.ingredients.push({
				ingredientName: ingName, 
				amount: ingAmount,
				measurementId: ingMeasurement
			});
		}
	}
	
	//Dump instructions info in an array
	function arrayInstructionsConstructor() {
		var inputs = document.getElementsByClassName('instructionDesc');
			for (var i = 0; i < inputs.length; i++) {
				var instructionDesc = inputs[i].value;
				completeRecipe.instructions.push({
					instructionDesc: instructionDesc,
					instructionOrder: i
				});
			}
	}

	//run Recipe, Ingredient, and Instructions array constructors
	arrayRecipeConstructor();
	arrayIngredientsConstructor();
	arrayInstructionsConstructor();
	
	console.log(completeRecipe.recipeName, completeRecipe.recipeDesc);
	
	modelRecipe.viewRecipe(recipeId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Inserted Correctly');
			//res.json(result[0]);
			console.log(result[0]);
			console.log(recipeIdCurrent);
			
			//The Great Ingredients Add Experiment
			req.body.ingredients.forEach(function(value) {
				var ingredientName = value.ingredientName;
				var amount = value.amount;
				var measurementId = value.measurementId;
				var recipeId = recipeIdCurrent;
				console.log(recipeId);
				
				modelRecipe.insertIngredient(ingredientName, amount, measurementId, recipeId, function(error, result) {
					//check for errors
					if (error || result == null){
						res.status(500).json({success:false, data: error});
					} else {
						//without errors, print data
						console.log('Inserted Ingredient Correctly');
					}
				});	
			});

			req.body.instructions.forEach(function(value) {
				var instructionDesc = value.instructionDesc;
				var instructionOrder = value.instructionOrder;
				var recipeId = recipeIdCurrent;
				
				modelRecipe.insertInstruction(instructionDesc, instructionOrder, recipeId, function(error, result) {
					//check for errors
					if (error || result == null){
						res.status(500).json({success:false, data: error});
					} else {
						//without errors, print data
						console.log('Inserted Instruction Correctly');
						//res.json(result[0]);
					}
				});
			});
		}
	});*/
}

function viewRecipesBySUserId(req, res) {
//views recipe
//INPUT recipeId
//OUTPUT recipe information	(More info TBD)

	console.log("Viewing Recipes by sUserID.");

	//Test URL
	//localhost:5000/viewRecipeBySUserId?sUserId=1
	
	var sUserID = req.query.sUserID;
	console.log("Retrieving sUserID: ", sUserID);
	
	modelRecipe.getRecipesBySUserId(sUserID, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			res.json(result);
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
		if (error){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Deleted Correctly');
			res.json(result[0]);
		}
	});
}

function deleteCompleteRecipe(req, res) {
//deletes an existing recipe
//INPUT recipeId
//OUTPUT recipe_id

	console.log("Deleting Recipe.");
	
	//Test URL
	//localhost:5000/deleteCompleteRecipe?recipeId=21
	//localhost:5000/addRecipe?recipeName=Water&recipeDesc=Water&sUserId=1
	
	var recipeId = req.query.recipeId;
	
	modelRecipe.getIngredientsByRecipeId(recipeId, function(error, result) {
		if (result.length > 0) {
			modelRecipe.deleteIngredientsByRecipeId(recipeId, function(error, result){
				if (error){
					res.status(500).json({success:false, data: error});
				} else {
					//without errors, print data
					console.log('Deleted Ingredients from Recipe Delete Correctly');
					res.json(result);
				}
			});
		}
	});
	modelRecipe.getInstructionsByRecipeId(recipeId, function(error, result) {
		if (result.length > 0) {
			modelRecipe.deleteInstructionsByRecipeId(recipeId, function(error, result){
				if (error){
					res.status(500).json({success:false, data: error});
				} else {
					//without errors, print data
					console.log('Deleted Instructions from Recipe Delete Correctly');
					res.json(result);
				}
			});
		}
	});
	
	modelRecipe.getRecipeById(recipeId, function(error, result) {
		if (result.length > 0) {
			modelRecipe.deleteRecipeById(recipeId, function(error, result){
				if (error){
					res.status(500).json({success:false, data: error});
				} else {
					//without errors, print data
					console.log('Deleted Recipe from Recipe Delete Correctly');
					res.json(result);
				}
			});
		}
	});
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

function deleteIngredientsByRId(req, res) {
//deletes an existing ingredient
//INPUT recipeId
//OUTPUT N/A

	console.log("Deleting Ingredient.");
	
	//Test URL
	//localhost:5000/deleteIngredientsByRId?recipeId=20
	//localhost:5000/addIngredient?ingredientName=Water&amount=1&measurementId=1&recipeId=20
	
	var recipeId = req.query.recipeId;
	
	modelRecipe.deleteIngredientsByRecipeId(recipeId, function(error, result) {
		//check for errors
		if (error){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Deleted Correctly');
			res.json(result[0]);
		}
	});;
}

function deleteInstructionsByRId(req, res) {
//deletes an existing instruction
//INPUT recipeId
//OUTPUT N/A

	console.log("Deleting Instruction.");
	
	//Test URL
	//localhost:5000/deleteInstructionsByRId?recipeId=20
	//localhost:5000/addInstruction?instructionDesc=Pour%20Water&instructionOrder=1&recipeId=20
	
	var recipeId = req.query.recipeId;
	
	modelRecipe.deleteInstructionsByRecipeId(recipeId, function(error, result) {
		//check for errors
		if (error){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			console.log('Deleted Correctly');
			res.json(result[0]);
		}
	});;

}
