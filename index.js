module.exports = robot => {
  robot.on('pull_request.opened', async context => {
    // Code was pushed to the repo, what should we do with it?
    const result = await context.github.pullRequests.getReview(
   )



    robot.log(context)
  })
}





const MIN_REQUIRED_APPROVES = 2; 
const secret = 'GITHUB_SECRET_KEY_FOR_WEBHOOK';

function countNumberofApprovals(pullRequestReviews)

let countApproved = 0;
let {};
pullRequestReviews.forEach(function(element)))
    if(element.state === "APPROVED"){
            countApproved = 1;
        }
    else if(element.state === "CHANGES_REQUESTED" || element.status === "DISMISSED"){
            countApproved = 0;
        }
    else{
            countApproved = 0;




approve=require("./util/approveUtil");

