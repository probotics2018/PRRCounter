const fs = require('fs');

module.exports = robot => {
  robot.on('pull_request.opened', async context => {
  	template = fs.readFileSync("RESPONSE.md");
    console.log("SOMETHING IS HAPPENING");
    // Array of all pull requests and getting the first object in the array
    console.log(context.github.pullRequests.getAll("probotics2018", "test")[0]);


    // github.pull_request doesn't exist

    return context.github.issues.createComment(context.issue({body: template}));
  });
}
