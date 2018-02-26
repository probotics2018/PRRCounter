const fs = require('fs');
const numApproved = 0;

const owner = "probotics2018";
const repo = "test";

module.exports = robot => {
	var singlePR = {};
	robot.on('pull_request.opened', async context => {
	  	const options = context.repo({path: 'R_ISSUE_REPLY_TEMPLATE.md'})
	    const res = await context.github.repos.getContent(options)
	    const template = Buffer.from(res.data.content, 'base64').toString()
	    console.log("SOMETHING IS HAPPENING");
	    // Array of all pull requests and getting the first object in the array

		const prArray = await context.github.pullRequests.getAll({
			"owner": owner,
			"repo": repo,
			"state":"open"
		});
		// Should return the latest pull request
		singlePR = JSON.parse(JSON.stringify(prArray))["data"][0];
		console.log("SINGLEPRNUMBER" + singlePR["number"]);
		var commitArray = await context.github.pullRequests.getCommits({
			"owner": owner, 
			"repo": repo, 
			"number": singlePR["number"]
		});
		commitArray = JSON.parse(JSON.stringify(commitArray));
		console.log("COMMITARRAY" + JSON.stringify(commitArray));
		var sha = commitArray["data"][0]["sha"];
		var commitURL = commitArray["data"][0]["url"];
		if (sha == null) {
			console.log("WHYYYYYYYYYYYYYYYYY");
		} else {
			setStatus = await context.github.repos.createStatus({
				"owner": owner, 
				"repo": repo,
				"sha": sha, 
				"state": "failure"
			});
		}

	    return context.github.issues.createComment(context.issue({body: template}));
	});
	robot.on('pull_request_review.submitted', async context => {
	console.log('Review submitted');
		approveReviews = 0;
	  	var reviewsArray = await context.github.pullRequests.getReviews({
	  		"owner": owner,
	  		"repo": repo,
	  		"number": singlePR["number"]
	  	});
	  	reviewsArray = JSON.parse(JSON.stringify(reviewsArray));
	  	reviewsArray = reviewsArray["data"];
	  	console.log("REVIEWSARRAY" + JSON.stringify(reviewsArray));
	  	if (reviewsArray.length > numApproved) {
	  		console.log("we're in the loop");
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
