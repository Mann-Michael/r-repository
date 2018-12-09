const modelMenu = require('../models/modelMenu.js');

//EXPORT function
module.exports = {
	viewRecipeBySUserId: viewRecipeBySUserId, 
	viewRecipeAndInstructionsBySUserId: viewRecipeAndInstructionsBySUserId
};

//MENU CONTROLLER Functions
function viewRecipeBySUserId(req, res) {
//views recipe ids by s user id
//INPUT sUserId
//OUTPUT 

	console.log("Viewing Recipes.");

	//Test URL
	//localhost:5000/viewRecipeBySUserId?sUserId=1
	
	var sUserId = req.query.sUserId;
	console.log("Retrieving sUserId: ", sUserId);
	
	modelMenu.getRecipeBySUserId(sUserId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			res.json(result);
		}
	});
}

function viewRecipeAndInstructionsBySUserId(req, res) {
//views recipes with instructions by s user id
//INPUT sUserId
//OUTPUT 

	console.log("Viewing Recipes and instruction.");

	//Test URL
	//localhost:5000/viewRecipeAndInstructionsBySUserId?sUserId=1
	
	var sUserId = req.query.sUserId;
	console.log("Retrieving sUserId: ", sUserId);
	
	modelMenu.getRecipeAndInstructionsBySUserId(sUserId, function(error, result) {
		//check for errors
		if (error || result == null){
			res.status(500).json({success:false, data: error});
		} else {
			//without errors, print data
			res.json(result);
		}
	});
}