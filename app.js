// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
require("dotenv").config();
const { generateBotMessage } = require ('./block');
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: "debug",
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
});

// All the room in the world for your code

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();



app.command('/elvin', async ({  ack, body, client }) => {
  // Acknowledge command request
  await ack(
    'in_channel',// response_type: 'in_channel' | 'ephemeral';
    true, //replace_original
    false,// delete_original
    "hahaa" // text
  );


  await client.chat.postMessage({
    channel: body.channel_id,
    blocks: generateBotMessage(),
    text: 'elvin posting message back'
  });


});


// The echo command simply echoes on command
app.command("/open-pack", async ({ command, ack, respond }) => {
  console.log(command);
  
  try {
    await ack().catch(error => console.log('error'));
    await respond(`${command.text.toString()}`);
  } catch (error) {
    //console.log(error);
  }
});