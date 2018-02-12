module.exports = robot => {
  robot.on('pull_request.opened', async context => {
    const options = context.repo({path: 'R_ISSUE_REPLY_TEMPLATE.md'})
    const res = await context.github.repos.getContent(options)
    const template = Buffer.from(res.data.content, 'base64').toString()
    console.log("SOMETHING IS HAPPENING");
    console.log(process.env.APP_ID);

    return context.github.issues.createComment(context.issue({body: template}))
  });
}
