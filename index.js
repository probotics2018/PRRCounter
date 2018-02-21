module.exports = robot => {
  robot.on('pull_request.opened', async context => {
    const options = context.repo({path: 'R_ISSUE_REPLY_TEMPLATE.md'})
    const res = await context.github.repos.getContent(options)
    const template = Buffer.from(res.data.content, 'base64').toString()
    console.log("SOMETHING IS HAPPENING");
    // Array of all pull requests and getting the first object in the array
    console.log(context.github.pullRequests.getAll("probotics2018", "test")[0]);


    // github.pull_request doesn't exist

    return context.github.issues.createComment(context.issue({body: template}));
  });
}
