# PRRCounter

Instructions for installing PRRCounter on a Windows computer

--------------

## Create a new Heroku app
1. Clone the repository of the app you want to deploy Example: `git clone git@github.com:probotics2018/PRRCounter.git`
2. Create a new heroku app using the command `heroku create`
3. Go back to your [app settings page](https://github.com/settings/apps) and update the **Webhook URL** to the URL of your deployment, e.g. `http://arcane-lowlands-8408.herokuapp.com/`.
4. Download the private key from the github app settings page and replace every line break with a \n and delete the line break
         
         -----BEGIN EXAMPLE PRIVATE KEY-----\nmyprivatekydannjksdhaf8ygsdhflajsdfdlj\nsdlfahaubhsnflkdasfadsf\nioasdhgioahsdfsda\n-----END PRIVATE KEY-----
5. Configure the Heroku app, replacing the `APP_ID` and `WEBHOOK_SECRET` with the values for those variables, and setting the path for the `PRIVATE_KEY`:

        $ heroku config:set APP_ID=12345 WEBHOOK_SECRET="mysecret" PRIVATE_KEY="-----BEGIN EXAMPLE PRIVATE KEY----- 1234y8hdksfdbasdkbjhk\n"
