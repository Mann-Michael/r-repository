function procMenu() {
	console.log('Getting Menu...');
	//clear current menu
	$('#menuMaker').html('');
	
	/*
	this will be turned on when i set the login info. 
	var sUserId = $('#sUserId').val();
	console.log('Id: ' + sUserId);
	*/
	//this is what I'm using while waiting to make login happen
	var sUserId = 3;
	console.log('UserId: ' + sUserId);

	$.ajax({
	    url: '/viewRecipeAndInstructionsBySUserId?sUserId=' + sUserId,
	    type: 'GET',
		beforeSend: function(request) {
			request.setRequestHeader("Access-Control-Allow-Origin", "*");
		},
		complete: function (jqXHR, textStatus) {
			console.log('complete');
		},
		crossDomain: true, 
 	    success: function (data) {
			
			var idList = [];
			
			for (var i = 0; i < 7; i++) {
				//find a random index within the array
				var rndNum = Math.floor(Math.random() * Math.floor(data.length));
				
				//log recipe information
				console.log('index: ' + rndNum + ' Recipe Id: ' + data[rndNum].recipe_id + ' currRecipeName: ' + data[rndNum].recipe_name + ' currRecipeDesc: ' + data[rndNum].recipe_desc);			
				
				var pushThisID = true;
				$.each(idList, function (idIndex, idValue) {
					if (idValue == data[rndNum].recipe_id) {
						pushThisID = false;
					}
				});
				if (pushThisID) {
					idList.push(data[rndNum].recipe_id);
					
					var strOutput = '<div class="menu-wrapper">';
						strOutput += '<h2>' + data[rndNum].recipe_name + '</h2>';
						strOutput += '<p>' + data[rndNum].recipe_desc + '</p>';
						strOutput += '<h3>Instructions</h3>';
						strOutput += '<ol>';
						$.each(data, function (index, value) {
							if (value.recipe_id == data[rndNum].recipe_id) {
								strOutput += '<li>';
									strOutput += value.instruction_desc;
								strOutput += '</li>';
							}
						});
						strOutput += '</ol>';
						strOutput += '<h3>Ingredients</h3>';
						strOutput += '<ul class="recipe-ingredients-' + data[rndNum].recipe_id + '">';
						strOutput += '</ul>';
					strOutput += '</div>';
				
					$('#menuMaker').append(strOutput);
					
					$.ajax({
						url: '/viewRecipeIngredients?recipeId=' + data[rndNum].recipe_id,
						type: 'GET',
						beforeSend: function(request2) {
							request2.setRequestHeader("Access-Control-Allow-Origin", "*");
						},
						complete: function (jqXHR2, textStatus2) {
							console.log('ingredients complete');
							$('#msgShoppingList').text('COMPLETE');
						},
						crossDomain: true, 
						success: function (data2) {	
							//print recipe and instruction info in console
							console.log('retrieving ingredients');
							
							$.each(data2, function (ingIndex, ingValue) {
								
								var strIngredientsOutput = '<li>';
										strIngredientsOutput += ingValue.amount + ' ' + ingValue.measurement_name + ' ' + ingValue.ingredient_name;
									strIngredientsOutput += '</li>';
							
								console.log('PROCESSING AN INGREDIENT FOR RECIPE ' + ingValue.recipe_id + ': ' + strIngredientsOutput);
									
								$('.recipe-ingredients-' + ingValue.recipe_id).css('overflow', 'auto');
								$('.recipe-ingredients-' + ingValue.recipe_id).append(strIngredientsOutput);
							});
						},
						error: function (jqXHR2, textStatus2, errorThrown2) {
						   console.log('error');
						}		
					});
				}
			}
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
		   console.log('error');
	    }		
	});
	

	

	
	
		/*
		get all recipes from the user
		pick 7 at random
		store ids into recipe array
		Starting with the first recipe id, get all recipe information and put it into a div
		then, using that recipe id, get all instructions and put them into an ordered list within the recipe div
		move to the next recipe id
		
		loop through the recipe id array and get all ingredients, sort them by by sort order
		loop through array and dump them in a list
		move to next recipe and ingredientsdump all info into a shopping list div
		
		
	*/
	
	
}