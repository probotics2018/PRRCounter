const fs = require('fs');
const numApproved = 2;

module.exports = robot => {
	robot.on('pull_request.opened', async context => {
	    // Array of all pull requests and getting the first object in the array
	    var owner = context["payload"]["pull_request"]["head"]["repo"]["owner"]["login"];
	    var repo = context["payload"]["pull_request"]["head"]["repo"]["name"];
		
		var sha = context["payload"]["pull_request"]["head"]["sha"];
		if (sha == null) {
			console.log("SHA IS NULL");
		} else {
			setStatus = await context.github.repos.createStatus({
				"owner": owner, 
				"repo": repo,
				"sha": sha, 
				"state": "failure",
				"context": "Pull Request Review Counter",
				"description": "You do not have " + numApproved + " approved pull requests reviews!"
			});
		}

	    return;
	});
	robot.on('pull_request_review.submitted', async context => {
		console.log('Review submitted');
		approveReviews = 0;

		var singlePRNum = context["payload"]["pull_request"]["number"];
		var owner = context["payload"]["pull_request"]["head"]["repo"]["owner"]["login"];
	    var repo = context["payload"]["pull_request"]["head"]["repo"]["name"];

	  	var reviewsArray = await context.github.pullRequests.getReviews({
	  		"owner": owner,
	  		"repo": repo,
	  		"number": singlePRNum
	  	});
	  	reviewsArray = JSON.parse(JSON.stringify(reviewsArray));
	  	reviewsArray = reviewsArray["data"];
  		for (var a = 0; a < reviewsArray.length; a++) {
  			if(reviewsArray[a]["state"] == "APPROVED") {
  				approveReviews++;
  			}
  		}

	  	var sha = context["payload"]["review"]["commit_id"];
	  	if (approveReviews >= numApproved) {
	  		console.log("There are more than " + numApproved + " approved reviews");
	  		setStatus = await context.github.repos.createStatus({
	  			"owner":owner,
	  			"repo":repo,
	  			"sha":sha,
	  			"state": "success",
	  			"context": "Pull Request Review Counter",
	  			"description": "Pull request review requirement met!"
	  		})
	  	} else {
	  		console.log("There are " + approveReviews + " approved reviews");
	  	}
	  	return;
	});
}
