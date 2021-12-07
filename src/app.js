// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");
const { ConsoleLogger } = require("@slack/logger");
require("dotenv").config();
const express = require("express");
const {
  GenerateClaimBlock,
  getImageRepoJson,
} = require("./functions/create-block");
const { GetCardById, GetUserInfo, initDb, GetAll, ClaimCard } = require("./db");
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
imageHostingApp.use("/", express.static("public"));
imageHostingApp.listen(parseInt(process.env.IMAGE_HOSTING_PORT));
// Slack / Bolt Integration

(async () => {
  // start db
  await initDb();
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");

  ///TODO:  all sql test code here after init
  let allCards = await GetAll();
  console.log("getAll: ", allCards);
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
  await client.chat.postMessage({
    channel: body.channel_id,
    blocks: blocks,
    text: "elvin posting message back",
  });
});

app.action("claim", async ({ ack, body, client }) => {
  console.log(body);
  await ack();
  // hackthon way to pick put block thats selected

  let selectedId = body.actions[0].value;
  let msg = "";

  ClaimCard(body.user.name, selectedId);

  //TODO: update the claimed card with the username
  await GetCardById(selectedId).then((value) => {
    let card = JSON.parse(JSON.parse(JSON.stringify(value))[0].card);
    msg = `<@${body.user.name}> claimed ${card.name} | *${card.category}*`;
  });

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
