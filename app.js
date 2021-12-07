// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
require('dotenv').config()

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: 'debug',
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// All the room in the world for your code

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();


app.command('/elvin', async ({ command, ack, respond }) => {
  console.log("elvin hahahaa")
  // Acknowledge command request
  await ack(
    'in_channel',// response_type: 'in_channel' | 'ephemeral';
    true, //replace_original
    false,// delete_original
    "hahaa" // text
  );

   await respond(`hahahaa this is commmand text: ${command.text}`);

});


// The echo command simply echoes on command
app.command('/open-pack ', async ({ command, ack, respond }) => {
  // Acknowledge command request
  ack(
    'in_channel',// | 'ephemeral';
    true,
    false,
    "fire!"
  );

   await respond(`hahahaa this is commmand text: ${command.text}`);
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