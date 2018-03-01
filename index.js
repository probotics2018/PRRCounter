const fs = require('fs');
const numApproved = 2;

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
	    console.log("CONTEXT" + JSON.stringify(context));
	    var usableContext = JSON.parse(JSON.stringify(context));
	    var singlePRNum = usableContext["payload"]["pull_request"]["number"]
		
		var commitArray = await context.github.pullRequests.getCommits({
			"owner": owner, 
			"repo": repo, 
			"number": singlePRNum
		});
		commitArray = JSON.parse(JSON.stringify(commitArray));
		console.log("COMMITARRAY" + JSON.stringify(commitArray));
		var sha = commitArray["data"][0]["sha"];
		// var commitURL = commitArray["data"][0]["url"];
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
		var usableContext = JSON.parse(JSON.stringify(context));

		var singlePRNum = usableContext["payload"]["pull_request"]["number"];
	  	var reviewsArray = await context.github.pullRequests.getReviews({
	  		"owner": owner,
	  		"repo": repo,
	  		"number": singlePRNum
	  	});
	  	reviewsArray = JSON.parse(JSON.stringify(reviewsArray));
	  	reviewsArray = reviewsArray["data"];
	  	console.log("REVIEWSARRAY" + JSON.stringify(reviewsArray));
	  	if (reviewsArray.length >= numApproved) {
	  		console.log("we're in the loop");
	  		for (var a = 0; a < reviewsArray.length; a++) {
	  			console.log(reviewsArray[a]);
	  			console.log(reviewsArray[a]["state"]);
	  			if(reviewsArray[a]["state"] == "APPROVED") {
	  				approveReviews++;
	  			}
	  		}
	  	}
	  	var sha = usableContext["payload"]["review"]["commit_id"];
	  	if (approveReviews >= numApproved) {
	  		console.log("There are more than " + numApproved + " approved reviews");
	  		setStatus = await context.github.repos.createStatus({
	  			"owner":owner,
	  			"repo":repo,
	  			"sha":sha,
	  			"state": "success"
	  		})
	  	} else {
	  		console.log("There are " + approveReviews + " approved reviews");
	  	}
	});
}
