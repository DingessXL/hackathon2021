// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const { ConsoleLogger } = require("@slack/logger");
require("dotenv").config();
const express = require("express");
const { GenerateClaimBlock, getImageRepoJson } = require("./functions/create-block");

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
    false, // delete_original
    "claimingImages" // text
  );

  let blocks = GenerateClaimBlock();
<<<<<<< HEAD
  console.log("hahhaa blocks: ", blocks);
=======

>>>>>>> 0bc318d43dc84fab1e78e116594f6be44b0a9f67
  await client.chat.postMessage({
    channel: body.channel_id,
    blocks: blocks,
    text: "elvin posting message back",
  });
});

<<<<<<< HEAD
app.action("claim", async ({ ack, body, client }) => {
  console.log(body);
=======
app.action('claim', async ({ack, body, client}) => {
>>>>>>> 0bc318d43dc84fab1e78e116594f6be44b0a9f67
  await ack();
  // hackthon way to pick put block thats selected

  let selectedId = body.actions[0].value;
  let imgsJson = getImageRepoJson();
  let result = imgsJson.cards.filter(img => img.id === selectedId);
  const msg = `<@${body.user.name}> claimed ${result[0].name} | *${result[0].from}*`;
  await client.chat.postMessage({
    channel: body?.container?.channel_id,
    text: msg,
  });
});

// The echo command simply echoes on command
app.command("/open-pack", async ({ ack, body, client }) => {
  // Acknowledge command request
  await ack(
    "in_channel", // response_type: 'in_channel' | 'ephemeral';
    true, //replace_original
    false, // delete_original
    "claimingImages" // text
  );

  let blocks = await GenerateClaimBlock();
  await client.chat.postMessage({
    channel: body.channel_id,
    blocks: blocks,
    text: "Make your claim now!",
  });
});


