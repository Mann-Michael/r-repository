// general variables
var express = require('express');
var app = express();
//Require Controllers
const ctrlRecipe = require('./controllers/ctrlRecipe.js');
const ctrlMenu = require('./controllers/ctrlMenu.js');
const ctrlUser = require('./controllers/ctrlUser.js');
//Require Models
const modelRecipe = require('./models/modelRecipe.js');
const modelMenu = require('./models/modelMenu.js');
const modelUser = require('./models/modelUser.js');

//Session Information
//var session = require('express-session');
const SESS_UserId = 1;

//testing commands
//Login to local DB: psql -d rrepository -U dbuser

//app variables
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("port", (process.env.PORT || 5000));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// DEBUG INFO
app.listen(app.get('port'), function() {
	console.log('Node app is running on port: ', app.get('port'));
});


// CONTROLLER ROUTING
// Default Route
app.get('/', function(req, res){
    res.sendFile('viewMenu.html', { root: __dirname + '/public' } );
});
// Recipe Routes
app.get('/addRecipe', ctrlRecipe.addRecipe);
app.post('/addCompleteRecipe', ctrlRecipe.addCompleteRecipe);
app.get('/addIngredient', ctrlRecipe.addIngredient);
app.get('/addInstruction', ctrlRecipe.addInstruction);
app.get('/updateRecipe', ctrlRecipe.updateRecipe);
app.get('/updateIngredient', ctrlRecipe.updateIngredient);
app.get('/updateInstruction', ctrlRecipe.updateInstruction);
app.get('/viewRecipe', ctrlRecipe.viewRecipe);
app.get('/viewCompleteRecipe', ctrlRecipe.viewCompleteRecipe);
app.get('/viewRecipesBySUserId', ctrlRecipe.viewRecipesBySUserId);
app.get('/viewRecipeIngredients', ctrlRecipe.viewRecipeIngredients);
app.get('/viewRecipeInstructions', ctrlRecipe.viewRecipeInstructions);
app.get('/deleteRecipe', ctrlRecipe.deleteRecipe);
app.get('/deleteCompleteRecipe', ctrlRecipe.deleteCompleteRecipe);
app.get('/deleteIngredient', ctrlRecipe.deleteIngredient);
app.get('/deleteInstruction', ctrlRecipe.deleteInstruction);
app.get('/deleteIngredientsByRId', ctrlRecipe.deleteIngredientsByRId);
app.get('/deleteInstructionsByRId', ctrlRecipe.deleteInstructionsByRId);
// Menu Routes
//app.get('/viewMenu', ctrlMenu.viewMenu);
app.get('/viewRecipeBySUserId', ctrlMenu.viewRecipeBySUserId);
app.get('/viewRecipeAndInstructionsBySUserId', ctrlMenu.viewRecipeAndInstructionsBySUserId);
