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
app.get('/updateRecipe', updateRecipe);
app.get('/viewRecipe', viewRecipe);
app.get('/deleteRecipe', deleteRecipe);
app.get('/viewMenu', viewMenu);

//function to state that the server is running
app.listen(app.get('port'), function() {
	console.log('Node app is running on port: ', app.get('port'));
});

// routing functions
function addUser(req, res) {
	
	console.log("Adding Users.");

}

function addRecipe(req, res) {
	
	console.log("Adding Recipes.");
	
}

function updateRecipe(req, res) {
	
	console.log("Updating Recipes.");

}

function viewRecipe(req, res) {
	
	console.log("Viewing Recipes.");
	var id = req.query.id;
	console.log("Retrieving recipe id: ", id);
	
	getRecipeFromDb(id, function(error, result) {
		//check for errors
		if (error || result == null || result.length != 1){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			res.json(result[0]);
		}
	});
}


function deleteRecipe(req, res) {
	
	console.log("Deleting Recipes.");

}

function viewMenu(req, res) {
	
	console.log("Viewing Menu.");

}

// worker bee functions

function getRecipeFromDb(id, callback) {
	console.log('get person from db with id:', id);
	
	var sql = "SELECT recipe_name, recipe_desc, s_user_id FROM recipe WHERE recipe_id = $1::int";
	var params = [id];
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
