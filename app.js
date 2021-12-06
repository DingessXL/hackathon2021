// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
require('dotenv').config()

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
});

// All the room in the world for your code

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

app.event('message', async({event, client, context}) => {
  console.log(" message captured");
})

// The echo command simply echoes on command
app.command('/open-pack ', async ({ command, ack, respond }) => {
  console.log(" we are getting command: ", command, respond);
  // Acknowledge command request
  await ack();

  await respond(`${command.text}`);
});

app.event('app_home_opened', async ({ event, client, context }) => {
  console.log("app home opendedd")

  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await client.views.publish({

      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: 'home',
        callback_id: 'home_view',

        /* body of the view */
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Welcome to your _App's Home_* :tada:"
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "testing the listener........"
            }
          }
        ]
      }
    });
  }
  catch (error) {
    console.log("")
    console.error(error);
  }
});