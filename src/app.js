// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
require("dotenv").config();
const express = require("express");
const { GenerateClaimBlock } = require("./functions/create-block");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: "debug",
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Static Image Hosting
const imageHostingApp = express();
console.log(__dirname);
imageHostingApp.use("/static", express.static("public"));
imageHostingApp.listen(parseInt(process.env.IMAGE_HOSTING_PORT));
// Slack / Bolt Integration

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();

app.command("/elvin", async ({ ack, body, client }) => {
  // Acknowledge command request
  await ack(
    "in_channel", // response_type: 'in_channel' | 'ephemeral';
    true, //replace_original
    false,// delete_original
    "claimingImages" // text
  );

  await client.chat.postMessage({
    channel: body.channel_id,
    blocks: GenerateClaimBlock(),
    text: "elvin posting message back",
  });
});

app.action('claim', async ({ack, body, client}) => {
  console.log(body);
  await ack();
  const msg = `<@${body?.user?.name}> claimed ${body?.message?.blocks[0]?.text?.text}`;
  await client.chat.postMessage({
    channel: body?.container?.channel_id,
    text: msg
  });
});

// The echo command simply echoes on command
app.command("/open-pack", async ({  ack, body, client }) => {
  try {
    await ack().catch((error) => console.log("error"));
    await client.chat.postMessage({
      channel: body.channel_id,
      blocks: GenerateClaimBlock(),
      text: "Make your claim now!",
    });
  } catch (error) {
    console.log(error);
  }
});
