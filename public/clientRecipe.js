//this is what I'm using while waiting to make login happen
var sUserId = 3;
console.log('UserId: ' + sUserId);
	

function addInstructionButton() {
	$('#instruction-div').append('<div class="field-wrapper"><label>Instruction</label><input type="text" class="instructionDesc" required></div>');
}

function addIngredientButton() {
	$('#ingredient-div').append('<div class="field-wrapper"><label>Ingredient</label><input type="text" class="ingredientName" required></div><div class="field-wrapper"><label>Amount</label><input type="number" class="amount" required></div><div class="field-wrapper"><label>Measurement</label><select class="measurementId"><option value="1">cup/s</option><option value="2">tablespoon/s</option><option value="3">teaspoon/s</option><option value="4">quart/s</option><option value="5">gallon/s</option><option value="6">pinch/es</option><option value="7">unit/s</option></select></div>');
}

function addRecipeButton() {
	//gather the recipe information
	var completeRecipe;

	//loop through instructions and dump in array
	//loop through ingredient, amount, and measurement id and dump them in array

	//Dump recipe info in an array
	function arrayRecipeConstructor() {
		recipeName = document.getElementById("recipeName").value;
		recipeDesc = document.getElementById("recipeDesc").value;
		completeRecipe = {
			recipeName: recipeName,
			recipeDesc: recipeDesc,
			ingredients: [],
			instructions: []
		};
	}	

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
	
	$.ajax({
		url: '/addCompleteRecipe',
		type: 'POST',
		beforeSend: function(request) {
			request.setRequestHeader("Access-Control-Allow-Origin", "*");
		},
		data: completeRecipe,
		dataType: 'json',
		complete: function (jqXHR, textStatus) {
			console.log('ingredients complete');
			$('#msgShoppingList').text('COMPLETE');
		},
		crossDomain: true, 
		success: function (data) {	
			//print recipe and instruction info in console
			console.log('retrieving ingredients');
		},
		error: function (jqXHR, textStatus, errorThrown) {
		   console.log('error');
		}		
	});
}

function procAddRecipe() {
	console.log('Adding Recipe...');
	
	var	strOutput = '<h1>Add a Recipe</h1>';
		strOutput += '<form action="/viewRecipe.html" method="get">';		
		strOutput += '<input type="submit" onclick="addRecipeButton()"></input>';		
		strOutput += '<div id="recipe-div">';
		strOutput += '<div class="field-wrapper"><label>Name</label><input type="text" id="recipeName" required></div>';
		strOutput += '<div class="field-wrapper"><label>Description</label><input type="text" id="recipeDesc" required></div>';		
		strOutput += '</div>';
		strOutput += '<div id="instruction-div">';
		strOutput += '<div class="field-wrapper">';
		strOutput += '<h2>Instructions</h2>';
		strOutput += '<input type="button" value="+ Instruction" onclick="addInstructionButton()"></input>';
		strOutput += '</div>';
		strOutput += '<div class="field-wrapper"><label>Instruction</label><input type="text" class="instructionDesc" required></div>';
		strOutput += '</div>';
		strOutput += '<div id="ingredient-div">';
		strOutput += '<div class="field-wrapper">';
		strOutput += '<h2>Ingredients</h2>';
		strOutput += '<input type="button" value="+ Ingredient" onclick="addIngredientButton()"></input>';
		strOutput += '</div>';
		strOutput += '<div class="field-wrapper"><label>Ingredient</label><input type="text" class="ingredientName" required></div>';
		strOutput += '<div class="field-wrapper"><label>Amount</label><input type="number" class="amount" required></div>';
		strOutput += '<div class="field-wrapper"><label>Measurement</label><select class="measurementId"><option value="1">cup/s</option><option value="2">tablespoon/s</option><option value="3">teaspoon/s</option><option value="4">quart/s</option><option value="5">gallon/s</option><option value="6">pinch/es</option><option value="7">unit/s</option></select></div>';
		strOutput += '</div>';
		strOutput += '</form>';	
		
	$('#default').html(strOutput);

/*
Upon Add Recipe Button --> DEFAULT is set to form with recipe fields and Next Button
Upon Add Recipe Next Button --> call addRecipe, set SESS_recipeId to returned recipe_id, set DEFAULT to form with all associated ingredients, Add Ingredient fields, Ingredient Add Button, Instructions Button
Upon Ingredient Add Button --> call addIngredient, refresh the form
Upon Instructions Button --> set DEFAULT to form with all associated instructions, add Instruction Fields, Add Instructions button, Instruction Finish Button
Upon Instruction Add Button --> call add Instructions, refresh the form
Upon Finish Recipe Add Button --> Set DEFAULT to view recipe record, all ingredients, and all instructions	
 */
}

function procListRecipesForUpdate() {
	console.log('Listing Recipes for Update...');
	//This function lists all recipes by User ID, then the user picks one and is sent to a page with fields to udpate the recipd record. 

	$.ajax({
		url: '/viewRecipesBySUserId?sUserID=' + sUserId,
		type: 'GET',
		beforeSend: function(request) {
			request.setRequestHeader("Access-Control-Allow-Origin", "*");
		},
		complete: function (jqXHR, textStatus) {
			console.log('recipe list by sUserId complete');
			//$('#default').text('COMPLETE');
		},
		crossDomain: true, 
		success: function (data) {	
			//print recipe and instruction info in console
			console.log('recipe list by sUserId success');
			
				var strOutput = '<div>';
					strOutput += '<h1>Update Recipe</h1>';
					$.each(data, function (index, value) {
						strOutput += '<div class="menu-wrapper">';
						strOutput += '<input type="button" value="'+ data[index].recipe_name + '" onclick="procUpdateRecipe('+ data[index].recipe_id + ')" ></input>';
						strOutput += '</div>';
					});
				strOutput += '</div>';
			
				$('#default').html(strOutput);
		},
		error: function (jqXHR, textStatus, errorThrown) {
		   console.log('recipe list by sUserId error');
		}		
	});
	
}

function procUpdateRecipe(recipeId) {
	console.log('Updating Recipe...');
	
	var recipeId = recipeId;
	
		$.ajax({
		url: '/viewCompleteRecipe?recipeId=' + recipeId,
		type: 'GET',
		beforeSend: function(request) {
			request.setRequestHeader("Access-Control-Allow-Origin", "*");
		},
		complete: function (jqXHR, textStatus) {
			console.log('recipe by recipeId complete');
		},
		crossDomain: true, 
		success: function (data) {	
			//print recipe and instruction info in console
			console.log('recipe by recipeId success');
			
			var	strOutput = '<h1>Update Recipe</h1>';
				strOutput += '<form action="/viewRecipe.html" method="get">';		
				strOutput += '<input type="submit" onclick="addRecipeButton()"></input>';		
				strOutput += '<div id="recipe-div">';
				strOutput += '<div class="field-wrapper"><label>Name</label><input type="text" value="' + data.recipe_name + '" id="recipeName" required></div>';
				strOutput += '<div class="field-wrapper"><label>Description</label><input type="text" value="' + data.recipe_desc + '" id="recipeDesc" required></div>';		
				strOutput += '</div>';
				strOutput += '</form>';	
				
			$('#default').html(strOutput);
		},
		error: function (jqXHR, textStatus, errorThrown) {
		   console.log('recipe list by sUserId error');
		}		
	});
	
	
	
	
	

/*
Upon Edit Recipe Button --> Set DEFAULT to list of Recipes by SESS_UserId with Edit buttons by each
Upon Edit Single Recipe Button --> Set DEFAULT to form with fields populated with recipe information and Edit Current Recipe Button, set SESS_recipeId to current recipe 
Upon Edit Current Recipe Button --> Call editRecipeById, set DEFAULT to list of ingredients by SESS_recipeId with Edit Current Ingredient Button on each, and Edit Instructions Button
Upon Edit Current Ingredient Button --> Call updateIngredientById and refresh DEFAULT to Upon Edit Current Recipe Button state
Upon Edit Instructions Button --> Call viewRecipeInstructions with Edit Current Instruction Buttons on each, and Finish Button
Upon Edit Current Instruction Button --> Call updateInstructionById and refresh DEFAULT to Upon Edit Instructions Button state
*/	
	
}

function procListRecipesForDelete() {
	console.log('Listing Recipes for Delete...');

	$.ajax({
		url: '/viewRecipesBySUserId?sUserID=' + sUserId,
		type: 'GET',
		beforeSend: function(request) {
			request.setRequestHeader("Access-Control-Allow-Origin", "*");
		},
		complete: function (jqXHR, textStatus) {
			console.log('recipe list by sUserId complete');
			//$('#default').text('COMPLETE');
		},
		crossDomain: true, 
		success: function (data) {	
			//print recipe and instruction info in console
			console.log('recipe list by sUserId success');
			
				var strOutput = '<div>';
					strOutput += '<h1>Delete Recipe</h1>';
					$.each(data, function (index, value) {
						strOutput += '<div class="menu-wrapper">';
						strOutput += '<input type="button" value="'+ data[index].recipe_name + '" onclick="procDeleteRecipe('+ data[index].recipe_id + ')" ></input>';
						strOutput += '</div>';
					});
				strOutput += '</div>';
			
				$('#default').html(strOutput);
		},
		error: function (jqXHR, textStatus, errorThrown) {
		   console.log('recipe list by sUserId error');
		}		
	});
	
}

function procDeleteRecipe(recipeId) {
	console.log('Deleting Recipe, Instructions, and Ingredients by Recipe Id:' + recipeId);	
	
	$.ajax({
		url: '/deleteCompleteRecipe?recipeId=' + recipeId,
		type: 'GET',
		beforeSend: function(requestRec) {
			requestRec.setRequestHeader("Access-Control-Allow-Origin", "*");
		},
		complete: function (jqXHRRec, textStatusRec) {
			console.log('deleteCompleteRecipe complete');
		},
		crossDomain: true, 
		success: function (dataRec) {	
			//print recipe and instruction info in console
			console.log('deleteCompleteRecipe success');
			$('#default').html('SUCCESS');
			procListRecipesForDelete();
			
		},
		error: function (jqXHRRec, textStatusRec, errorThrownRec) {
		   console.log('deleteCompleteRecipe error');
		}		
	});	
}