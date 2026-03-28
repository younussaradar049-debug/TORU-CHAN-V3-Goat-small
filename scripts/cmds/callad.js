const { getStreamsFromAttachment } = global.utils;

module.exports = {
  config: {
    name: "callad",
    aliases: ["calladmin","kakashi", "hridoy"],
    version: "6.0.0",
    author: "Hridoy",
    countDown: 5,
    role: 0,
    description: "Report with working reply system",
    category: "Utility",
    guide: "{pn} <report>"
  },

  onStart: async function ({ args, message, event, api, usersData }) {
    const ADMIN_THREAD_ID = "25622944850719979";

    if (!args[0])
      return message.reply("❌ | Write your report!");

    const senderID = event.senderID;
    const senderName = await usersData.getName(senderID);
    const content = args.join(" ");

    const body =
`📩 REPORT SYSTEM
━━━━━━━━━━━━━━━━━━
👤 ${senderName}
🆔 ${senderID}

📝 ${content}
━━━━━━━━━━━━━━━━━━
⚡ Reply this message`;

    const formMessage = {
      body,
      mentions: [{
        id: senderID,
        tag: senderName
      }],
      attachment: await getStreamsFromAttachment(
        [...event.attachments, ...(event.messageReply?.attachments || [])]
      )
    };

    try {
      const info = await api.sendMessage(formMessage, ADMIN_THREAD_ID);

      // 🔥 IMPORTANT FIX
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        messageID: info.messageID,
        author: senderID,
        threadID: event.threadID,
        type: "replyToUser"
      });

      message.reply("✅ | Report sent to admin!");
    } catch (e) {
      console.log(e);
      message.reply("❌ | Failed!");
    }
  },

  onReply: async function ({ event, api, Reply, message }) {
    if (Reply.commandName !== "callad") return;

    const { author, type } = Reply;
    const msg = event.body;

    if (!msg) return;

    // 🔥 ADMIN REPLY → USER
    if (type === "replyToUser") {
      api.sendMessage(
        `📩 Admin Reply:\n━━━━━━━━━━━━━━━━━━\n${msg}\n━━━━━━━━━━━━━━━━━━`,
        author
      );

      message.reply("✅ | Reply sent!");
    }
  }
};
