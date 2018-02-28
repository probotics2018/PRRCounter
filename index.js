module.exports = robot => {
	robot.on('pull_request.opened', async context => {
    // Code was pushed to the repo, what should we do with it?
    console.log("Catch submit event");
    console.log("1:"+context.github.pullRequests);
    console.log("2:"+context.github.pullRequests.head);
    console.log("3:"+context.github.pullRequests.head.repo);
    console.log("4:"+context.github.pullRequests.head.repo.owner.login);
    console.log(context.github.pullRequests.head.repo.name);
    console.log(context.github.pullRequests.number);
    const result = await context.github.pullRequests.getReview({
    	owner:context.github.pullRequests.head.repo.owner.login,
    	repo:context.github.pullRequests.head.repo.name,
    	number:context.github.pullRequests.number
    })
    console.log(result);
   //start to count the number of approves
   const config = await context.config('PRRCounter.yml')
   
   let countApproved = 0;
   pullRequestReviews.forEach(element in result)
   {
   console.log(element) 
   if(element.state === "APPROVED"){
   	countApproved =countApproved + 1;
   }
}

   //now we have the councontext.github.pullRequests.head.repo.namet;

   let Status;
   let Description;

   console.log(countApproved);

   if (countApproved <config.MIN_REQUIRED_APPROVES){
   	Status="success";
   	Description="Ready for Merge";
   }
   else{
   	Status="pending";
   	Description="Need two approvals for Merge";
   }

//POST /repos/:owner/:repo/statuses/:sha

context.github.repos.createStatus({
	owner:context.github.pullRequests.head.repo.owner.login,
	repo:context.github.pullRequests.head.repo.name,
	sha:context.github.pullRequests.head.sha,
	state:Status,
	description:Description
}).then(()=>context.github.response.send(Status))

robot.log(context)

});


}






