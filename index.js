const fs = require('fs');

module.exports = robot => {
  robot.on('pull_request.opened', async context => {
  	template = fs.readFileSync("RESPONSE.md");
    console.log("SOMETHING IS HAPPENING");
    // Array of all pull requests and getting the first object in the array
    var PRarray = context.github.pullRequests.getAll({
		"owner": "probotics2018",
		"repo": "test"
	});
    console.log(PRarray[0]);


    // github.pull_request doesn't exist

    return context.github.issues.createComment(context.issue({body: template}));
  });
}
