const fs = require("fs");
const path = require("path");
require("dotenv").config();

const getImageRepoJson = () => {
  let url = path.join(__dirname, "..", "..", "data", "imageRepo.json");
  let data = JSON.parse(fs.readFileSync(url, "utf-8"));
return data;
}

const GenerateClaimBlock = () => {
  let url = path.join(__dirname, "..", "..", "data", "imageRepo.json");
  let data = JSON.parse(fs.readFileSync(url, "utf-8"));
  let blocks = [];

  for (var card in data["cards"]) {
    let cardData = data.cards[card];
    let { name, from, id, description, img } = cardData;
    blocks.push(
      getHeaderBlock(id, name, from),
      getImageBlock(id, name, img),
      getDescriptionBlock(description),
      getClaimButtonBlock(id),
      getDividerBlock()
    );
  }
  console.log(blocks);
  return blocks;
};

function getHeaderBlock(id, name, from) {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `${name} | *${from}*`,
    },
  };
}

function getImageBlock(id, name, img) {
  return {
    type: "image",
    image_url: img,
    alt_text: name,
  };
}

function getDescriptionBlock(description) {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: description,
    },
  };
}

function getClaimButtonBlock(id) {
  return {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Claim",
          emoji: true,
        },
        value: id,
        style: "primary",
        action_id: "claim",
      },
    ],
  };
}

function getDividerBlock() {
  return {
    type: "divider",
  };
}
module.exports = {
  GenerateClaimBlock,
  getImageRepoJson
};
