const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { GetRandomDrawFromDB } = require("../db");
const GenerateClaimBlock = async () => {
  return new Promise((resolve, reject) => {
    GetRandomDrawFromDB(3).then((databaseData) => {
      let data = JSON.parse(JSON.stringify(databaseData));
      let blocks = [];
      for (var card in data) {
        let d = JSON.parse(data[card].card);
        let { name, category, id, description, img, claimedBy } = d;
        blocks.push(
          getHeaderBlock(name, category),
          getImageBlock(id, name, img),
          getDescriptionBlock(description),
          claimedBy
            ? getDescriptionBlock(`Claimed by *${claimedBy}*`)
            : getClaimButtonBlock(id),

          getDividerBlock()
        );
      }
      console.log(blocks);

      resolve(blocks);
    });
  });
};

function getHeaderBlock(name, category) {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `${name} | *${category}*`,
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
        value: id.toString(),
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
};
