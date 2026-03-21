const axios = require("axios");

module.exports = {
  config: {
    name: "gf",
    version: "1.0.0",
    author: "Hridoy",
    role: 0,
    shortDescription: "Random GF image/video",
    category: "Fun",
    guide: "{pn}",
    cooldown: 5
  },

  onStart: async function ({ api, event }) {

    const links = [
      "https://files.catbox.moe/k3qo09.jpeg",
      "https://files.catbox.moe/xia4x2.jpeg",
      "https://files.catbox.moe/mgo1bl.jpeg",
      "https://files.catbox.moe/ie54k2.jpeg",
      "https://files.catbox.moe/nf58qu.jpeg",
      "https://files.catbox.moe/qmj3pr.mp4",
      "https://files.catbox.moe/v8kths.mp4",
      "https://files.catbox.moe/ko81fg.mp4",
      "https://files.catbox.moe/ymmafa.mp4",
      "https://files.catbox.moe/owh366.mp4"
    ];

    try {
      const randomLink = links[Math.floor(Math.random() * links.length)];

      // 🔥 direct stream (image + video both support)
      const stream = await global.utils.getStreamFromURL(randomLink);

      return api.sendMessage({
        body: "💖 Your GF is here 😘",
        attachment: stream
      }, event.threadID, event.messageID);

    } catch (err) {
      console.error(err);
      return api.sendMessage("⚠️ GF aste aste chole ashtese... abar try koro 😅", event.threadID, event.messageID);
    }
  }
};
