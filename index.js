const fs = require('fs');
const numApproved = 0;

module.exports = robot => {
	var singlePR = {};
	robot.on('pull_request.opened', async context => {
	  	const options = context.repo({path: 'R_ISSUE_REPLY_TEMPLATE.md'})
	    const res = await context.github.repos.getContent(options)
	    const template = Buffer.from(res.data.content, 'base64').toString()
	    console.log("SOMETHING IS HAPPENING");
	    // Array of all pull requests and getting the first object in the array
	    var prArray = await context.github.pullRequests.getAll({
			"owner": "probotics2018",
			"repo": "test"
		});
		// Should return the latest pull request
		singlePR = JSON.parse(JSON.stringify(prArray))["data"][0];


	    return context.github.issues.createComment(context.issue({body: template}));
	});
	robot.on('pull_request_review.submitted', async context => {
	console.log('Pull request submitted');
		approveReviews = 0;
	  	var reviewsArray = await context.github.pullRequests.getReviews({
	  		"owner": "probotics2018",
	  		"repo": "test",
	  		"number": singlePR["number"]
	  	});
	  	if (reviewsArray.length > numApproved) {
	  		for (var a = 0; a < reviewsArray; a++) {
	  			console.log(reviewArrays[a]);
	  			console.log(reviewArrays[a]["state"]);
	  			if(reviewsArray[a]["state"] == "APPROVED") {
	  				approveReviews++;
	  			}
	  		}
	  	}
	  	if (approveReviews > numApproved) {
	  		console.log("There are more than 2 approved reviews");
	  	} else {
	  		console.log("There are " + approveReviews + " approved reviews");
	  	}
	});
}
