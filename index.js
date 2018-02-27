module.exports = robot => {
  robot.on('issues.opened', async context => {
    const options = context.repo({path: 'R_ISSUE_REPLY_TEMPLATE.md'})
    const res = await context.github.repos.getContent(options)
    const template = Buffer.from(res.data.content, 'base64').toString()

     const result = await github.issues.pullRequests.getAll(saanvid, PRRcounter)

    return context.github.issues.createComment(context.issue({body: template}))
    //get all pull requests
  })
}
