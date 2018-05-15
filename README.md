# PRRCounter

PRRCounter is a GitHub app that counts the number of approved pull request reviews an app has and then changes the pull request's status to mergeable/not mergeable depending on the number of approved pull request necessary specified in Github.json (in the base folder of the repository)

---------------------

## How PRRCounter works

PRRCounter checks for the number of pull request reviews that have the status of `approved`, then it sets a status on the pull request to either `error` or `pass` depending on the number of pull request reviews with the `approved` status on the pull request. 

----------------

## Necessary Tools

+ A Heroku Account
+ A Windows 7 Computer

-----------------

## Instructions for installing and deploying PRRCounter on a Windows computer

### Create a new Heroku app
1. If you haven't already, download and install [Heroku](https://devcenter.heroku.com/articles/heroku-cli) and ask Mr. Schmit for the Heroku email/password
2. Clone the repository of the app you want to deploy Example: `git clone git@github.com:probotics2018/PRRCounter.git`
3. Create a new heroku app using the command `heroku create` in a terminal window in the folder of the repository you just cloned
4. Create a new GitHub app [here](https://github.com/settings/apps) and fill in the name. You can set the homepage URL User Authorization callback URL, and Webhook URL to the URL of this repository (https://github.com/probotics2018/PRRCounter). You can specify a webhook secret if you'd like but you don't have to set it. 
 + Allow the app to have permission to read+write of Repository Contents, Deployments, Issues, Pull requests, repository webhooks, commit statuses, and checks.
5. Go back to your [app settings page](https://github.com/settings/apps) and update the **Webhook URL** to the URL of your deployment, e.g. `http://arcane-lowlands-8408.herokuapp.com/`.
6. Download the private key from the github app settings page and replace every line break with a \n and delete the line break
         
BEFORE
         
         -----BEGIN EXAMPLE PRIVATE KEY-----
         myprivatekydannjksdhaf8ygsdhflajsdfdlj
         sdlfahaubhsnflkdasfadsnaslnabsfjfljdsl
         ioasdhgioahsdfsda
         -----END PRIVATE KEY-----
AFTER

         -----BEGIN EXAMPLE PRIVATE KEY-----\nmyprivatekydannjksdhaf8ygsdhflajsdfdlj\nsdlfahaubhsnflkdasfadsnaslnabsfjfljdsl\nioasdhgioahsdfsda\n-----END PRIVATE KEY-----
7. Configure the Heroku app, replacing the `APP_ID` and `WEBHOOK_SECRET` with the values for those variables, and setting the path for the `PRIVATE_KEY`:

         heroku config:set APP_ID=12345 WEBHOOK_SECRET="mysecret" PRIVATE_KEY="-----BEGIN EXAMPLE PRIVATE KEY----- 1234y8hdksfdbasdkbjhk\n"
8. Deploy the app to heroku with `git push heroku master`
a. If you want to push a branch to the heroku app, use command `git push heroku mybranchname:master`
9. App should be running, check it by setting LOG_LEVEL to trace using `heroku config:set LOG_LEVEL=trace` and then checking the heroku logs with `heroku logs --tail`

### Target Repository Configuration
1. Go to the repository's settings page (https://github.com/user/repository/settings) and then to the branches tab. 
2. Under that tab, click the edit button next to the name of the branch you want to protect (generally the master branch). 
3. Check the `Protect this branch` option and then `Require status checks to pass before merging`. 
4. If applicable, check the `Pull Request Review Counter` status check to ensure that it is accounted by GitHub

-----------------

### Expected Outcome
1. To generate the expected outcome, install PRRCounter on a repository and create a file called `Github.json`. This file should be structured like [this](https://github.com/probotics2018/PRRCounter/blob/master/Github.json) where the number next to `"approved-reviewer-count"` is the required number of approved reviews a Pull Request must have before being allowed to merge into the master branch

### Troubleshooting
If Heroku cannot detect that we're using NodeJS, use command `heroku buildpacks:set heroku/nodejs` to set the language to NodeJS

Set webhook secret to an actual secret if there are authentication errors
