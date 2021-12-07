//TODO:  make data dynamic
const generateBotMessage = (data) => {
	return [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Robin | *Teen Titans*"
            }
        },
        {
            "type": "image",
            "image_url": "https://static.wikia.nocookie.net/teentitans/images/1/1b/Robin.png/revision/latest/scale-to-width-down/1000?cb=20210428005258",
            "alt_text": "marg"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Richard John 'Dick' Grayson known as Robin is the main protagonist of the Teen Titans series. He is the leader and one of the five founding members of the Teen Titans. Before that, he was trained by, and served as the sidekick to Batman."
            }
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Claim",
                        "emoji": true
                    },
                    "value": "robinId",
                    "style": "primary",
                    "action_id": "claim"
                }
            ]
        }
    ]
}

module.exports = {
	generateBotMessage
}