module.exports = robot => {
  robot.on('push', async context => {
    // Code was pushed to the repo, what should we do with it?
    robot.log(context)
  })
}



const MIN_REQUIRED_APPROVES = 2; 
const secret = 'GITHUB_SECRET_KEY_FOR_WEBHOOK';

function countNumberofApprovals(pullRequestReviews)

let countApproved = 0;
let finalStatusOfApproval = {};




approve=require("./util/approveUtil");

