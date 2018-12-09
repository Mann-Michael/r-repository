function procAddRecipe() {
	console.log('Adding Recipe...');
	
	var recipeName = $('#recipeName').val();
	console.log('Name: ' + recipeName);
	
	var recipeDesc = $('#recipeDesc').val();
	console.log('Description: ' + recipeDesc);
	
	var sUserId = 1;
	console.log('UserId: ' + sUserId);
	
	$.get('/addRecipe', {recipeName: recipeName, recipeDesc: recipeDesc, sUserId: sUserId}, function(data) {
		console.log('Back from the server with:');
		console.log(data);
		//ERROR!! VM953 jquery.min.js:2 XHR failed loading: GET "http://localhost:5000/addRecipe?recipeName=Water&recipeDesc=Water&sUserId=1".
		$('div.message').html('<p>' + result + '</p>');
	})
}