const fs = require('fs');

module.exports = robot => {
  robot.on('pull_request.opened', async context => {
  	const options = context.repo({path: 'R_ISSUE_REPLY_TEMPLATE.md'})
    const res = await context.github.repos.getContent(options)
    const template = Buffer.from(res.data.content, 'base64').toString()
    console.log("SOMETHING IS HAPPENING");
    // Array of all pull requests and getting the first object in the array
    var PRarray = await context.github.pullRequests.getAll({
		"owner": "probotics2018",
		"repo": "test"
	});
    console.log("HERE" + PRarray);


    // github.pull_request doesn't exist

    return context.github.issues.createComment(context.issue({body: template}));
  });
}
