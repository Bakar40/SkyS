const app = require("express")();
//const chalk = require("chalk");
const config = require("./config.json");
const prefix = config.prefix;
const log = {
  server: "825059024557965332",
  images: "1102278743554273340",
  channels: "1102279115932975195",
  messages: "1102278818510667776",
  members: "1102278903080419441",
  voice: "1102279054524170300",
  ban: "1117098605778579556",
  unban: "1117098622643880027",
  muteText: "1117098672824528987",
  unmuteText: "1117098688993566720",
  timeout: "1117098942669258842",
  untimeout: "1117098959937224734",
  warn: "1117099151910518795",
  unwarn: "1117104038207569920",
  muteVoice: "1117105523897143398",
  unmuteVoice: "1117107791841218670",
};

const allowedChannels = {
  ban: "1117098605778579556",
  unban: "1117098622643880027",
  muteText: "1117098672824528987",
  unmuteText: "1117098688993566720",
  muteVoice: "1117105523897143398",
  unmuteVoice: "1117107791841218670",
  timeout: "1117098942669258842",
  untimeout: "1117098959937224734",
  warn: "1117099151910518795",
  kick: "1117099582036398180",
};

process.env = process.env ?? {};
process.env.token =
  "";

const moment = require("moment");
const { inviteTracker } = require("discord-inviter");
const axios = require("axios");
app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.listen(3000, () => {
  console.log("Sky On Top");
});

//packaging

const {
  Client,
  Collection,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");
let { QuickDB } = require("quick.db");
let db = new QuickDB();
let ms = require("ms");
//VARS

const line = config.line;
let sugchannel = "1098780393500586086";
let fedchannel = "1061613164837482607";
var taxchannel = "1067352517224173638";
var transferChannel = "1061613270932389928";
var boostChannel = "1098770424927617024";
var welcome = "1062046141253959784";
let order = "1061632898232492093";
let yes = "✅";
let no = "❌";
let link = "https://discord.gg/89czJuaSfq";
let color = config.color;

//

const client = new Client({
  intents: 32767,
}).setMaxListeners(1000);

app.get("/checkAdminUsers", (req,res) => {
    if (!client.user) return res.json({m:[]});
    const guild = client.guilds.cache.get('825059024557965332');
    if (!guild) return res.json({m:[]});
    const adminUsers = guild.members.cache.filter(m => m.roles.cache.find(r => r.id === "1268291328987496599"))?.map(m => m.id);
    return res.json({m: adminUsers});
  })


app.get("/checkStaff", (req,res) => {
  if (!client.user) return res.json({m:[]});
  const guild = client.guilds.cache.get('825059024557965332');
  if (!guild) return res.json({m:[]});
  const staffUsers = guild.members.cache.filter(m => m.roles.cache.find(r => r.id === "1109046116793729054"))?.map(m => m.id);
  return res.json({m: staffUsers});
})


//
tricker = new inviteTracker(client);
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
require("./handler")(client);
//

//autokill
const { AutoKill } = require("autokill");
AutoKill({ Client: client, Time: 10000 });
process.on("unhandledRejection", (error) => {
  return console.log(error);
});

client.on("messageCreate", (message) => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  if (args[0] === prefix + "help") {
    let menu = new MessageSelectMenu()
      .setCustomId(`help_${message.author.id}`)
      .setPlaceholder("Choose a category")
      .addOptions([
        {
          label: "information",
          description: "To view the information ",
          value: "1",
          emoji: "1049037233082089502",
        },
        {
          label: "Admin",
          description: "To display admin commands ",
          value: "2",
          emoji: "1049037275994001508",
        },
        {
          label: "General",
          description: "To display general commands ",
          value: "3",
          emoji: "1049037311314239518",
        },
        {
          label: "Delete",
          description: "Delete messages list ",
          value: "5",
          emoji: "1041154454470262904",
        },
      ]);

    let row = new MessageActionRow().addComponents([menu]);

    let button = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("Server Support")
        .setURL(link)
    );

    let embed = new MessageEmbed()

      .setDescription(
        `> <a:emoji_31:1044116862511886386> **𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝗧𝗼 SkyRise Services** 

> <a:emoji_23:1044116322830786630> **𝗶𝗙 𝗬𝗼𝘂 𝗪𝗮𝗻𝗻𝗮 𝗩𝗶𝗲𝘄 𝗧𝗵𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗖𝗵𝗼𝗼𝘀𝗲 𝗮 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆**`
      )
      .setImage(line)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setColor(color)
      .setTimestamp();
    message
      .reply({ embeds: [embed], components: [row, button] })
      .then((msg) => {
        let filter = (b) =>
          b.user.id === message.author.id &&
          b.customId === `help_${message.author.id}`;
        let collector = msg.createMessageComponentCollector({
          filter: filter,
          componentType: "SELECT_MENU",
          time: 120000,
        });
        collector.on("collect", (b) => {
          if (b.values[0] === "1") {
            const { version: djsversion } = require("discord.js");
            const { version } = require("./package.json");
            let days = Math.floor(client.uptime / 86400000);
            let hours = Math.floor(client.uptime / 3600000) % 24;
            let minutes = Math.floor(client.uptime / 60000) % 60;
            let seconds = Math.floor(client.uptime / 1000) % 60;
            let embed_1 = new MessageEmbed()

              .setAuthor(
                `Information Bot:`,
                client.user.displayAvatarURL({ dynamic: true })
              )
              .setColor(color)
              .setTimestamp()
              .addFields([
                {
                  name: `Bot:`,
                  value: `\`\`\`Version: v${version}
Name: ${client.user.tag}
Id: ${client.user.id}
Users: ${client.guilds.cache
                    .reduce((a, b) => a + b.memberCount, 0)
                    .toLocaleString()}
Guilds Count: ${client.guilds.cache.size.toLocaleString()}
Node.js version: ${process.version}
discord js version: v${djsversion}
Platform: ${process.platform}\`\`\``,
                },
                {
                  name: `Server:`,
                  value: `\`\`\`Bot Prefix: ${prefix}
Bot Language: English\`\`\``,
                },
                {
                  name: `System:`,
                  value: `\`\`\`Ping: ${client.ws.ping}ms
Uptime: ${seconds}s ${minutes}m ${hours}h ${days}d\`\`\``,
                },
              ]);
            b.update({ embeds: [embed_1], components: [row, button] }).catch(
              (err) => {}
            );
          } else if (b.values[0] === "2") {
            let embed_1 = new MessageEmbed()

              .setAuthor(
                `Admin Commands:`,
                client.user.displayAvatarURL({ dynamic: true })
              )
              .setColor(color)
              .setTimestamp().setDescription(`
> **${prefix}mute-text**

> **${prefix}unmute-text**

> **${prefix}mute-voice**

> **${prefix}unmute-voice**

> **${prefix}roles-collect**  

> **${prefix}lang-collect** 

> **${prefix}timeout**

> **${prefix}untimeout**  

> **${prefix}warn**

> **${prefix}ban**

> **${prefix}unban**  

> **${prefix}kick** 

> **${prefix}unbanall**  

> **${prefix}hide**   

> **${prefix}show**   

> **${prefix}hideall** 

> **${prefix}showall** 

> **${prefix}unlock**

> **${prefix}lockall** 

> **${prefix}unlockall**  

> **${prefix}clear**  

> **${prefix}role**`);
            b.update({ embeds: [embed_1], components: [row, button] }).catch(
              (err) => {}
            );
          } else if (b.values[0] === "3") {
            let embed_1 = new MessageEmbed()

              .setAuthor(
                `General Commands:`,
                client.user.displayAvatarURL({ dynamic: true })
              )
              .setColor(color)
              .setTimestamp().setDescription(`
> **${prefix}avatar-server** 

> **${prefix}avatar**  

> **${prefix}banner**  

> **${prefix}inrole**

> **${prefix}invites** 

> **${prefix}ping**    

> **${prefix}say**    

> **${prefix}say-embed**    

> **${prefix}server**  

> **${prefix}tax**  

> **${prefix}top-inv**  
      `);
            b.update({ embeds: [embed_1], components: [row, button] }).catch(
              (err) => {}
            );
          } else if (b.values[0] === "5") {
            msg.delete().catch((err) => {});
            message.delete().catch((err) => {});
          }
        });
      });
  }
});

//auto line
let embedline = ["00", "00"];

client.on("messageCreate", (message) => {
  if (message.channel.type === "dm" || message.author.bot) return;

  if (embedline.includes(message.channel.id)) {
    let embed = new MessageEmbed().setColor(color).setImage(line);

    message.channel.send({ embeds: [embed] }).catch((err) => {
      console.log(err.message);
    });
  }
});

//welcome
client.on("guildMemberAdd", async (member) => {
  let userName = member.user.username;
  let createdAt = member.user.createdAt;
  let memberCount = member.guild.memberCount;
  let welcomefukenembed = new MessageEmbed()
    .setAuthor({
      name: member.user.username,
      iconURL: member.user.displayAvatarURL({ dynamic: true }),
    })
    .setFooter({
      text: member.user.username,
      iconURL: member.user.displayAvatarURL({ dynamic: true }),
    })
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setDescription(
      `> **<a:emoji_34:1044116992812126248> Hey : __${userName}__**

> **<a:emoji_16:1044115857204314143> Welcome To __${member.guild.name}__**

> **<a:emoji_28:1044116691979878521> If You Wanna Order Something <#${order}>**

> **<a:emoji_27:1044116524023173171> Account Created At __${createdAt.toLocaleString()}__**

> **<a:emoji_36:1044117120381878283> __Members Count :__ __${memberCount}__**`
    )
    .setImage(line)
    .setColor(color);
  member.guild.channels.cache
    .get(welcome)
    .send({ content: `<@!${member.user.id}>`, embeds: [welcomefukenembed] });
});

// welcome mentions
client.on("guildMemberAdd", async (member) => {
  if (log.server !== member.guild.id) return;

  const channelIDs = [
    "1098770418350968852",
    "1098770414366359683",
    "1122979725648855253",
  ];

  for (id in channelIDs) {
    const channel = member.guild.channels.cache.get(channelIDs[id]);
    if (!channel) continue;
    const m = await channel.send(
      `**${member} Welcome to skyrise please read this message above**`
    );
    await new Promise((t) => setTimeout(t, 6000));
    if (!m) continue;
    m.delete().catch((e) => console.log(e));
  }
});
//

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content === "link" || message.content === "لينك") {
    message.channel.send(`**
> Server Invite Link 
{ ${link} }
> Enjoy <a:aemoji_:1044381496884072498>
**`);
  }
  if (
    message.content === "line" ||
    message.content === "لاين" ||
    message.content === "خط"
  ) {
    message.delete();
    message.channel.send({
      embeds: [new MessageEmbed().setColor(color).setImage(line)],
    });
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("سلام عليكم")) {
    return message.reply(`> \`-\` <a:emoji_31:1044116862511886386> **وعليكم السلام ورحمة الله وبركاته** 
> \`/\`  <a:emoji_31:1044116862511886386>  **Welcome To : \`${message.guild.name}\`  **`);
  }
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.message) return;
  const argss = message.content.slice(prefix.length).trim().split(/ +/);
  const command = argss.shift().toLowerCase();

  if (command === "come") {
    let args = message.content.split(" ");
    let user =
      message.mentions.users.first() || client.users.cache.get(args[1]);
    if (!user) return message.reply("⚠ Mention ⚠");
    message.reply(`> <a:emoji_13:1044115634407088169> **Done Send Private to ${user}** 

> <a:emoji_12:1044115546771292222> **Please Wait Come Seller** `);
    user.send(`> <a:emoji_10:1044115274686803998> **Some One Need You** ${user}

> <a:aaarrow:1044282541919703070> **Channel Here :** <#${message.channel.id}>

> <a:emoji_1:1044114404628779109> **I Hope You Enter To See What He Want**`);
  }
  // warn

  if (command === "warn") {
    if (!message.member.permissions.has("BAN_ROLES"))
      return message.reply(`** 😕 You don't have permission **`);

    if (allowedChannels.warn !== message.channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.warn}> **!`
      );

    const tempR = (await db.get(`${message.guild.id}-Temp_Roles`)) || [];
    let argss = message.content.split(" ");
    let user =
      message.guild.members.cache.get(argss[1]) ||
      message.mentions.members.first();

    if (argss.length < 3)
      return message.reply(
        `**Error ! ... Usage : ${argss[0]} [user] [time] [reason]**`
      );

    if (!user) return message.reply(`**😕 Please A User !**`);

    let time_ms = ms(argss[2]);

    let time_format = ["s", "m", "h", "d", "y", "w"];

    if (
      !time_ms ||
      !time_format.includes(
        argss[2].substring(argss[2].length - 1, argss[2].length).toLowerCase()
      )
    )
      return message.reply(
        `** Error ! Unknown Time Format \`${argss[2]}\`.. Example : 7d**`
      );

    let reason = message.content.split(" ").slice(3) || "";

    if (reason.length !== 0) reason = `\nReason: \`${reason.join(" ")}\``;

    let warnRoles = ["1092249998000930907"];

    let added;

    if (!user.roles.cache.find((r) => r.id === warnRoles[0])) {
      user.roles
        .add(message.guild.roles.cache.find((r) => r.id === warnRoles[0]))
        .then(
          () =>
            (added = message.guild.roles.cache.find(
              (r) => r.id === warnRoles[0]
            ).name)
        );
    }
    if (user.roles.cache.find((r) => r.id === warnRoles[0]))
      return message.reply("**Error : This User Has Been Warned Before !**");

    await new Promise((r) => setTimeout(r, 1000));

    if (!added)
      return message.reply(
        "**Something Went Error While Giving The Warn To This User !**"
      );

    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle(`**Added ${added}**`).setDescription(`**User \`${
      user.user.username
    }\` Just Warned.
For: \`${ms(time_ms, { long: true })}\`${reason}**`);

    message.channel.send({ embeds: [embed] });
    user.send({ embeds: [embed] });

    tempR.forEach((info) => {
      if (info.userID === user.user.id && info.roleName === added) {
        let index = tempR.indexOf(info);
        if (index > -1) {
          tempR.splice(index, 1);
        }
      }
    });

    tempR.push({
      userID: user.user.id,
      roleName: added,
      time: time_ms,
    });

    db.set(`${message.guild.id}-Temp_Roles`, tempR);
  }
  //clear
  if (command === "clear") {
    const args = message.content.split(" ");
    const amount = parseInt(args[1]);

    if (isNaN(amount)) {
      return message.reply(
        "**Please provide a valid number of messages to delete!**"
      );
    } else if (amount < 1 || amount > 100) {
      return message.reply(
        "**You can only delete between 1 and 100 messages !**"
      );
    }

    const messages = await message.channel.messages.fetch({
      limit: amount,
    });

    try {
      const deleted = await message.channel.bulkDelete(messages);
      message.channel
        .send(`**${deleted.size} messages have been deleted successfully**`)
        .then((msg) => msg.delete(10000));
    } catch (error) {
      console.error(error);
      message.reply(
        `An error occurred while deleting messages: ${error.message}`
      );
    }
  }
  //ban
  if (command === "ban") {
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply(`** 😕 You don't have permission **`);
    if (!message.guild.me.permissions.has("BAN_MEMBERS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`
      );

    if (allowedChannels.ban !== message.channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.ban}> **!`
      );

    let argss = message.content.split(" ");
    let user =
      message.guild.members.cache.get(argss[1]) ||
      message.mentions.members.first();
    if (!user) return message.reply(`** 😕 Please mention or id **`);
    if (
      user.roles.highest.position >= message.member.roles.highest.position &&
      message.author.id !== message.guild.fetchOwner().id
    )
      return message.reply(`** ❌ You can't ban this user**`);

    if (!user.bannable) return message.reply(`** ❌ You can't ban this user**`);
    await user.ban().catch((err) => {
      console.log(err);
    });
    await message.reply(`✅ **${user.user.tag} banned from the server!**✈️`);
  } //unban
  if (command === "unban") {
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply(`** 😕 You don't have permission **`);
    if (!message.guild.me.permissions.has("BAN_MEMBERS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position. **`
      );
    if (allowedChannels.unban !== channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.unban}> **!`
      );

    let args = message.content.split(" ");
    let id = args[1];
    if (!id) return message.reply(`** 😕 Please mention or id **`);
    if (isNaN(id)) {
      return message.reply(`** 😕 Please mention or id **`);
    } else {
      message.guild.members
        .unban(id)
        .then((mmm) => {
          message.reply(`✅ ** ${mmm.tag} unbanned!**`);
        })
        .catch((err) =>
          message.reply(`**I can't find this member in bans list**`)
        );
    }
  }
  if (command === "mute-text") {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.reply("You don't have permissions to use that command!");

    if (allowedChannels.muteText !== message.channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.muteText}> **!`
      );

    let member = message.mentions.members.first();

    if (!member)
      return message.reply("Please mention a valid member of this server");

    if (!member.manageable)
      return message.reply(
        "I cannot mute this user! Do they have a higher role?"
      );

    let muteRole = message.guild.roles.cache.find(
      (role) => role.name === "Muted-T"
    );

    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          name: "Muted-T",
          color: "#000000",
        });

        message.guild.channels.cache
          .filter((c) => c.type !== "GUILD_VOICE")
          .forEach(async (channel, id) => {
            await channel.permissionOverwrites.create(muteRole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
      } catch (e) {
        console.log(e);
      }
    }

    member.roles.add(muteRole.id);

    message.reply(`✅ ${member.user.tag} was muted!`);
  }
  if (command === "unmute-text") {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.reply("You don't have permissions to use that command!");

    if (allowedChannels.unmuteText !== message.channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.unmuteText}> **!`
      );

    let member = message.mentions.members.first();

    if (!member)
      return message.reply("Please mention a valid member of this server");

    if (!member.manageable)
      return message.reply(
        "I cannot mute this user! Do they have a higher role?"
      );

    let muteRole = member.roles.cache.find((role) => role.name === "Muted-T");

    if (!muteRole) return message.reply(`**This member is not muted!**`);

    member.roles.remove(muteRole.id);

    message.reply(`✅ ${member.user.tag} was unmuted!`);
  }
  if (command === "mute-voice") {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.reply("You don't have permissions to use that command!");

    if (allowedChannels.muteVoice !== message.channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.muteVoice}> **!`
      );

    let member = message.mentions.members.first();

    if (!member)
      return message.reply("Please mention a valid member of this server");

    if (!member.manageable)
      return message.reply(
        "I cannot mute this user! Do they have a higher role?"
      );

    let muteRole = message.guild.roles.cache.find(
      (role) => role.name === "Muted-V"
    );

    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          name: "Muted-V",
          color: "#000000",
        });

        message.guild.channels.cache
          .filter((c) => c.type === "GUILD_VOICE")
          .forEach(async (channel, id) => {
            await channel.permissionOverwrites.create(muteRole, {
              SPEAK: false,
              SEND_MESSAGES: false,
            });
          });
      } catch (e) {
        console.log(e);
      }
    }

    member.roles.add(muteRole.id);

    message.reply(`✅ ${member.user.tag} was muted!`);
  }
  if (command === "unmute-voice") {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.reply("You don't have permissions to use that command!");

    if (allowedChannels.unmuteVoice !== message.channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.unmuteVoice}> **!`
      );

    let member = message.mentions.members.first();

    if (!member)
      return message.reply("Please mention a valid member of this server");

    if (!member.manageable)
      return message.reply(
        "I cannot mute this user! Do they have a higher role?"
      );

    let muteRole = member.roles.cache.find((role) => role.name === "Muted-V");

    if (!muteRole) return message.reply(`**This member is not muted!**`);

    member.roles.remove(muteRole.id);

    message.reply(`✅ ${member.user.tag} was unmuted!`);
  }
  if (command === "unbanall") {
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply(`** 😕 You don't have permission **`);

    if (allowedChannels.unban !== message.channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.unban}> **!`
      );

    const serverban = client.guilds.cache.get(message.guild.id);
    message.guild.bans
      .fetch()
      .then((bans) => {
        bans.forEach((ban) => {
          serverban.members.unban(ban.user.id);
        });
      })
      .then(() => {
        message.reply({ content: `> ** Done __Unbanned__ All Banlist **` });
      });
  } //kick
  if (command === "kick") {
    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has("KICK_MEMBERS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`
      );
    if (allowedChannels.kick !== message.channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.kick}> **!`
      );

    let id = message.content.split(" ").slice(1).join(" ");
    let user =
      message.mentions.members.first() || message.guild.members.cache.get(id);
    if (!user) return message.reply(`** 😕 Please mention or id **`);
    if (
      user.roles.highest.position >
      message.guild.members.resolve(message.author).roles.highest.position
    )
      return message.reply(`** ❌ You can't ban this user **`);
    if (
      user.roles.highest.position >
      message.guild.members.resolve(client.user).roles.highest.position
    )
      return message.reply(`** ❌ You can't ban this user **`);
    user
      .kick()
      .then(() =>
        message.reply(`**✅ @${user.user.username} kicked from the server!**`)
      )
      .catch((err) => message.reply(err));
  }
  if (command === "lock") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`
      );

    let everyone = message.guild.roles.cache.find(
      (hyper) => hyper.name === "@everyone"
    );
    message.channel.permissionOverwrites
      .edit(everyone, {
        SEND_MESSAGES: false,
      })
      .then(() => {
        message.reply(`**🔒 ${message.channel} has been looked.** `);
      });
  }
  if (command === "unlock") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`
      );

    let everyone = message.guild.roles.cache.find(
      (hyper) => hyper.name === "@everyone"
    );
    message.channel.permissionOverwrites
      .edit(everyone, {
        SEND_MESSAGES: true,
      })
      .then(() => {
        message.reply(`**🔓 ${message.channel} has been unlooked.** `);
      });
  }
  if (command === "lockall") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`
      );

    message.guild.channels.cache.each((channel) => {
      channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
        SEND_MESSAGES: false,
      });
    });
    message.reply("> ** Done __locked__ All Server Channels**");
  }
  if (command === "role") {
    let user = message.mentions.members.first();
    let role = message.mentions.roles.first();

    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply(`** 😕 You don't have permissions **`);

    if (!user || !role)
      return message.reply("**Please Mention The Role And The User !**");

    if (user.user.id === message.author.id)
      return message.reply("لا يمكن اعطاء رتبه لنفسك");
    if (user.user.id === client.user.id)
      return message.reply("لا يمكن اعطاء رتبه للبوت");

    user.roles.add(role);
    message.reply({
      embeds: [
        new MessageEmbed()

          .setColor("GREEN")
          .setDescription(
            `**✅ Change Roles For <@!${user.id}> , +<@&${role.id}>**`
          )
          .setThumbnail(interaction.user.avatarURL())
          .setTimestamp(),
      ],
    });
  }
  if (command === "timeout") {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.reply("You do not have permission to use this command!");

    if (allowedChannels.timeout !== message.channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.timeout}> **!`
      );

    const member = message.mentions.members.first();
    const args = message.content.split(" ");

    if (!member) {
      return message.reply("Please mention a valid member of this server");
    }

    if (!args[2])
      return message.reply("Please provide a valid timeout duration!");

    const time = ms(args[2]);

    if (isNaN(time)) {
      return message.reply("Please provide a valid timeout duration!");
    }

    member
      .timeout(time)
      .then(() => message.reply(`**✅ ${member.user.username} was timedout**`))
      .catch((e) => message.reply(`**🚫 Error : ${e.message}**`));
  }
  if (command === "untimeout") {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.reply("You do not have permission to use this command!");

    if (allowedChannels.untimeout !== message.channel.id)
      return message.reply(
        `**You Can Only Use This Command Here <#${allowedChannels.untimeout}> **!`
      );

    const member = message.mentions.members.first();

    if (!member) {
      return message.reply("Please mention a valid member of this server");
    }

    member
      .timeout(null)
      .then(() =>
        message.reply(`**✅ ${member.user.username} was untimedout**`)
      )
      .catch((e) => message.reply(`**🚫 Error : ${e.message}**`));
  }

  if (command === "unlockall") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`
      );

    message.guild.channels.cache.each((channel) => {
      channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
        SEND_MESSAGES: true,
      });
    });
    message.reply("> ** Done __Unlocked__ All Server Channels**");
  }
  if (command === "show") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`
      );

    let everyone = message.guild.roles.cache.find(
      (hyper) => hyper.name === "@everyone"
    );
    message.channel.permissionOverwrites
      .edit(everyone, {
        VIEW_CHANNEL: true,
      })
      .then(() => {
        message.reply(`**✅ ${message.channel} Done show this room.**`);
      });
  }
  if (command === "hide") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`
      );

    let everyone = message.guild.roles.cache.find(
      (hyper) => hyper.name === "@everyone"
    );
    message.channel.permissionOverwrites
      .edit(everyone, {
        VIEW_CHANNEL: false,
      })
      .then(() => {
        message.reply(`**✅ ${message.channel} Done hide this room.**`);
      });
  }
  if (command === "showall") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`
      );

    message.guild.channels.cache.each((channel) => {
      channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
        VIEW_CHANNEL: true,
      });
    });
    message.reply("> ** Done __Showed__ All Server Channels**");
  }
  if (command === "hideall") {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.reply(`** 😕 You don't have permissions **`);

    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.reply(
        `** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`
      );

    message.guild.channels.cache.each((channel) => {
      channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
        VIEW_CHANNEL: false,
      });
    });
    message.reply("> ** Done __Hidedd__ All Server Channels**");
  }
  if (command === "say") {
    let say = message.content.split(" ").slice(1).join(" ");

    if (!say) return message.reply("Please Put Text");

    message.delete();

    message.channel.send(say);
  }
  if (command === "say-embed") {
    let say = message.content.split(" ").slice(1).join(" ");
    if (!say) return message.reply("Please Put Text");
    let embed = new MessageEmbed()

      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setColor(color)
      .setImage(line)
      .setDescription(`${say}`);
    message.delete();
    message.channel.send({ embeds: [embed] });
  }
  if (command === "line") {
    message.delete();
    message.channel.send({
      embeds: [new MessageEmbed().setColor(color).setImage(line)],
    });
  }
});
//
client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.message) return;
  const argss = message.content.slice(prefix.length).trim().split(/ +/);
  const command = argss.shift().toLowerCase();

  if (command === "avatar-server") {
    var button = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setEmoji("✨")
        .setLabel(`Download Server Avatar`)
        .setURL(`${message.guild.iconURL({ dynamic: true, size: 4096 })}`)
    );
    message.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setDescription(
            `[Server Avatar link](${message.guild.iconURL({
              dynamic: true,
              size: 4096,
            })})`
          )
          .setImage(`${message.guild.iconURL({ dynamic: true, size: 4096 })}`),
      ],
      components: [button],
    });
  }
  if (command === "avatar") {
    let ff = message.mentions.users.first() || message.author;
    let userr = message.member.guild.members.cache.get(ff.id);

    var button = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setEmoji("✨")
        .setLabel(`DOWNLOAD AVATAR`)
        .setURL(userr.displayAvatarURL({ dynamic: true }))
    );

    message.reply({
      embeds: [
        new MessageEmbed()
          .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setDescription(
            `[Avatar link](${userr.user.displayAvatarURL({
              dynamic: true,
              size: 4096,
            })})`
          )
          .setImage(userr.displayAvatarURL({ dynamic: true, size: 4096 })),
      ],
      components: [button],
    });
  }
  if (command === "inrole") {
    const id = message.content.split(" ")[1];
    let role =
      message.mentions.roles.first() || message.guild.roles.cache.get(id);
    if (!role) return message.reply("pls mention role");
    let map = message.guild.roles.cache
      .get(role.id)
      .members.map((rr) => `> **<@${rr.id}> ( ${rr.id} )**`)
      .join("\n");

    message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(` **Info About \`${role.name}\`**  `)
          .setColor(color)
          .setDescription(
            `> **Role Name : **\`${role.name}\`

> **Members Count Have This Role :** \`${
              message.guild.roles.cache.get(role.id).members.size
            }\`


✨ **Members :**
${map}


> **Role Is Created At : **\`${moment(role.createdAt).format(
              "DD/MM/YYYY h:mm"
            )} \`

`
          )
          .setTimestamp()
          .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          }),
      ],
      split: true,
    });
  }
  if (command === "invites") {
    var member = message.mentions.members.first() || message.member;
    var invite = await inviteTracker.getMemberInvites(member);
    message.reply(`✨ ${member.user.username} Has Got ${invite.count} Invite(s) 
`);
  }
  if (command === "banner") {
    let user = message.mentions.users.first() || message.author;

    const data = await axios
      .get(`https://discord.com/api/users/${user.id}`, {
        headers: {
          Authorization: `Bot ${process.env.token}`,
        },
      })
      .then((d) => d.data);
    if (data.banner) {
      let url = data.banner.startsWith("a_")
        ? ".gif?size=4096"
        : ".png?size=4096";
      url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
      message.reply({
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setFooter({
              text: `Requested by ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setImage(url)
            .setDescription(`**[Download Banner](${url})**`)
            .setColor(color)
            .setTimestamp(),
        ],
      });
    } else {
      message.reply({ content: `**${user.username}, Dont have banner 😕**` });
    }
  }
  if (command === "top-inv") {
    var top = await inviteTracker.getTopInvites(message.guild);
    message.channel.send(
      top
        .map((i, n) => `\`#${n + 1}\`- **${i.user.tag}** has __${i.count}__`)
        .join("\n")
    );
  }
  if (command === "ping") {
    message.reply({
      embeds: [
        new MessageEmbed()
          .setDescription(
            `**🏓 Pong 🏓 

Latency is ${message.createdTimestamp - message.createdTimestamp}ms. 
API Latency is ${Math.round(client.ws.ping)}ms
Ws Ping Is ${client.ws.ping} **`
          )
          .setColor(color)
          .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setFooter({
            text: `Requested by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          }),
      ],
    });
  }
  if (command === "server") {
    await message.guild.members.fetch();
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache.size;
    const firstFiveEmojis = message.guild.emojis.cache
      .map((emoji) => emoji)
      .slice(0, 5)
      .join(" ");
    const boostCount = message.guild.premiumSubscriptionCount;
    const verificationLevel = message.guild.verificationLevel;
    const rolesCount = message.guild.roles.cache.size;

    await message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(color)
          .setAuthor({
            name: `${message.guild.name} Info`,
            iconURL: message.guild.iconURL({
              dynamic: true,
              size: 1024,
              format: "png",
            }),
          })
          .setThumbnail(
            message.guild.iconURL({ dynamic: true, size: 1024, format: "png" })
          )
          .addFields(
            {
              name: "🆔 Server ID:",
              value: `${message.guildId}`,
              inline: true,
            },
            {
              name: "📆 Created On:",
              value: `**<t:${Math.floor(
                message.guild.createdTimestamp / 1000
              )}:R>**`,
              inline: true,
            },
            {
              name: "👑 Owned by:",
              value: `<@!${message.guild.ownerId}>`,
              inline: true,
            },
            {
              name: `👥  Members (${message.guild.memberCount}):`,
              value: `**${
                members.filter((member) => member.presence?.status === "online")
                  .size +
                members.filter((member) => member.presence?.status === "idle")
                  .size +
                members.filter((member) => member.presence?.status === "dnd")
                  .size
              }** Online | Idle | DND\n**${
                members.filter(
                  (member) =>
                    !["online", "idle", "dnd"].includes(member.presence?.status)
                ).size
              }** Offline\n**${
                members.filter((member) => member.user.bot).size
              }** Bot`,
              inline: true,
            },
            {
              name: `💬 Channels (${message.guild.channels.cache.size}):`,
              value: `**${
                channels.filter((channel) => channel.type === 0).size
              }** Text | **${
                channels.filter((channel) => channel.type === 2).size
              }** Voice\n**${
                channels.filter((channel) => channel.type === 4).size
              }** Category`,
              inline: true,
            },
            {
              name: `🌐 Others:`,
              value: `Verification Level: **${verificationLevel}**\nBoosts: **${boostCount}** \nRoles: **${rolesCount}**`,
              inline: true,
            },
            {
              name: `🛡️ Emojis (${emojis}):`,
              value: `**${firstFiveEmojis}**`,
              inline: true,
            }
          ),
      ],
      ephemeral: true,
    });
  }
  if (command === "tax") {
    let args = message.content.split(" ").slice(1).join(" ");
    if (message.author.bot) return;
    if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
    else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
    else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
    else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
    else if (args.endsWith("b")) args = args.replace(/b/gi, "") * 1000000000;
    else if (args.endsWith("B")) args = args.replace(/B/gi, "") * 1000000000;
    let args2 = parseInt(args);
    let tax = Math.floor((args2 * 20) / 19 + 1);
    let tax2 = Math.floor((args2 * 20) / 19 + 1 - args2);
    let tax3 = Math.floor((tax2 * 20) / 19 + 1);
    let tax4 = Math.floor(tax2 + tax3 + args2);
    if (!args2)
      return message.reply(`
> ** Error It Must Be A Number ⚠ **`);
    if (isNaN(args2))
      return message.reply(`
> ** Error It Must Be A Number ⚠**`);
    if (args2 < 1)
      return message.reply(`
> ** Error It Must Be Larger Than 1 ⚠**`);
    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`first_embed`)
        .setLabel("Mediator")
        .setEmoji("👮‍♂️")
        .setStyle("PRIMARY")
    );
    let row2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`2_embed`)
        .setLabel("Back")
        .setEmoji("↩️")
        .setStyle("DANGER")
    );
    let m = await message.reply({
      content: `
> **<a:emoji_23:1044116322830786630> Your Tax Is : __${tax}__**`,
      components: [row],
    });
    let collector = m.createMessageComponentCollector({
      filter: (i) => i.user.id === message.author.id,
      time: 3600000,
      max: 2,
    });
    collector.on("collect", async (i) => {
      if (i.customId === "first_embed") {
        m.edit({
          content: `
> **<a:emoji_23:1044116322830786630> Your Tax Is : __${tax4}__**`,
          components: [row2],
        });
        row;
        i.deferUpdate();
      }
      if (i.customId === "2_embed") {
        m.edit({
          content: `
> **<a:emoji_23:1044116322830786630> Your Tax Is : __${tax}__**`,
          components: [row],
        });

        i.deferUpdate();
      } else {
        return;
      }
    });
  }
  if (command === "lang-collect") {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.reply(`** 😕 You don't have permissions **`);

    const embed = new MessageEmbed()
      .setTitle(
        `اختر لغة الدعم 
Choose support language`
      )
      .setThumbnail(message.guild.iconURL())
      .setDescription(`**🇸🇦 - العربية\n🇬🇧 - English**`)
      .setColor(color);
    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`arabic`)
        .setEmoji("🇸🇦")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId(`english`)
        .setEmoji("🇬🇧")
        .setStyle("PRIMARY")
    );

    let m = await message.channel.send({ embeds: [embed], components: [row] });
  }
  if (command === "roles-collect") {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.reply(`** 😕 You don't have permissions **`);

    const embed = new MessageEmbed()
      .setTitle(
        `جمع الرتب
Collect Roles`
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setDescription(
        `**
> 🔔 Notifications ↠ __All Server Announcement & Updates Mention__
> 
> 🛍️ Discounts ↠ __All Discounts, Offers & Packages Mention__
> 
> 🛒 Store Stuff ↠ __All Store Stuff.. Like Updates, Announcement, Offers & Discounts__
**`
      )
      .setColor(color);

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("roles")
        .setPlaceholder("Select A Role")
        .addOptions(
          {
            label: "Notifications",
            emoji: "🔔",
            value: "1099636364351373323",
          },
          {
            label: "Discounts",
            emoji: "🛍️",
            value: "1099636051598909501",
          },
          {
            label: "Store Stuff",
            emoji: "🛒",
            value: "1099636209724182548",
          }
        )
    );

    let m = await message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === "roles") {
    const role = interaction.guild.roles.cache.get(interaction.values[0]);

    interaction.message.edit();

    if (!role)
      return interaction.reply({
        content:
          "Role Not Found ! Please Contact With The Owner To Fix This Problem.",
        ephemeral: true,
      });

    if (!interaction.member.roles.cache.find((r) => r.id === role.id)) {
      interaction.member.roles
        .add(role.id)
        .then((r) =>
          interaction.editReply(`**The Role ${role} Has Been Added To You**`)
        )
        .catch((e) => interaction.editReply(`${e}`, { ephemeral: true }));
    } else {
      interaction.member.roles
        .remove(role.id)
        .then((r) =>
          interaction.editReply(
            `**The Role ${role} Has Been Removed From You**`,
            { ephemeral: true }
          )
        )
        .catch((e) => interaction.editReply(`${e}`, { ephemeral: true }));
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "arabic") {
    interaction.deferReply({ ephemeral: true });

    await new Promise((t) => setTimeout(t, 1000));

    if (
      !interaction.member.roles.cache.find(
        (r) => r.id === "1098770380283453583"
      )
    ) {
      interaction.member.roles
        .add("1098770380283453583")
        .then((r) =>
          interaction.editReply(
            `**لقد اخترت اللغه العربية وتم منحك رتبة : ${"<@&1098770380283453583>"} بناءً علي اختيارك**`,
            { ephemeral: true }
          )
        )
        .catch((e) => interaction.editReply(`${e}`, { ephemeral: true }));
    } else {
      interaction.member.roles
        .remove("1098770380283453583")
        .then((r) =>
          interaction.editReply(
            `** لقد تم ازالة الرتبة منك لضغطك علي الزر مرة اخري ! **`,
            { ephemeral: true }
          )
        )
        .catch((e) => interaction.editReply(`${e}`, { ephemeral: true }));
    }
  }
  if (interaction.customId === "english") {
    interaction.deferReply({ ephemeral: true });

    await new Promise((t) => setTimeout(t, 1000));

    if (
      !interaction.member.roles.cache.find(
        (r) => r.id === "1098770381105532928"
      )
    ) {
      interaction.member.roles
        .add("1098770381105532928")
        .then((r) =>
          interaction.editReply(
            `**The Role ${"<@&1098770381105532928>"} Has Been Added To You, Because You Clicked On 🇬🇧**`,
            { ephemeral: true }
          )
        )
        .catch((e) => interaction.editReply(`${e}`, { ephemeral: true }));
    } else {
      interaction.member.roles
        .remove("1098770381105532928")
        .then((r) =>
          interaction.editReply(
            `**The Role ${r} Has Been Removed From You, Because You Clicked Again On 🇬🇧**`,
            { ephemeral: true }
          )
        )
        .catch((e) => interaction.editReply(`${e}`, { ephemeral: true }));
    }
  }
});

// boost
client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (!oldMember.premiumSince && newMember.premiumSince) {
    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle("⚡ New Server Booster")
      .setFooter(
        newMember.user.tag,
        newMember.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `**
> ✨ New Server Boost Has Been Added By __${newMember}__
> 
> 💕 Thanks For Supporting Our Company 
**`
      )
      .setImage(line)
      .setThumbnail("https://j.top4top.io/p_2680ztcey0.png");

    newMember.guild.channels.cache.get(boostChannel).send({ embeds: [embed] });
  }
});

// transfer
client.on("messageCreate", async (message) => {
  if (
    message.channel.id === transferChannel &&
    message.author.id === "282859044593598464" &&
    message.content.includes("has transferred")
  )
    return message.channel.send({
      embeds: [new MessageEmbed().setColor(color).setImage(line)],
    });
});

//feedbck
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id != fedchannel) return;
  message.reply({
    embeds: [
      new MessageEmbed()
        .setTimestamp()
        .setAuthor({
          name: message.author.username,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setFooter({
          text: message.author.username,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `> <a:emoji_16:1044115857204314143> **Thanks For Giving Us Feedback** <a:emoji_16:1044115857204314143>

> <a:emoji_34:1044116992812126248> **Hope You Visit Us Again** <a:emoji_34:1044116992812126248>  `
        )
        .setImage(line)
        .setColor(color),
    ],
  });
});
//sug 1
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id != sugchannel) return;
  message.channel
    .send({
      embeds: [
        new MessageEmbed()
          .setTimestamp()
          .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setTitle("Suggestion:")
          .setFooter({
            text: "ID: " + message.author.id,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(
            `**${message.content}**
`
          )
          .setImage(line)
          .setColor(color),
      ],
    })
    .then(async (m) => {
      m.react(yes);
      m.react(no);
    });
  message.delete();
});

//sug 2 team
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id != 1042393475741655121) return;
  message.channel
    .send({
      embeds: [
        new MessageEmbed()
          .setTimestamp()
          .setAuthor({
            name: message.author.username,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setFooter({
            text: message.author.username,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(
            `**${message.content}**
`
          )
          .setImage(line)
          .setColor(color),
      ],
    })
    .then(async (m) => {
      m.react(yes);
      m.react(no);
    });
  message.delete();
});

const TicketToolID = "557628352828014614";

////tax

client.on("messageCreate", async (message) => {
  let args = message.content.split(" ").slice(0).join(" ");
  if (message.author.bot) return;
  if (args.endsWith("m")) args = args.replace(/m/gi, "") * 1000000;
  else if (args.endsWith("k")) args = args.replace(/k/gi, "") * 1000;
  else if (args.endsWith("M")) args = args.replace(/M/gi, "") * 1000000;
  else if (args.endsWith("K")) args = args.replace(/K/gi, "") * 1000;
  else if (args.endsWith("b")) args = args.replace(/b/gi, "") * 1000000000;
  else if (args.endsWith("B")) args = args.replace(/B/gi, "") * 1000000000;
  if (!message.guild) return;
  if (message.channel.id != taxchannel) return;
  let args2 = parseInt(args);
  let tax = Math.floor((args2 * 20) / 19 + 1);
  let tax2 = Math.floor((args2 * 20) / 19 + 1 - args2);
  let tax3 = Math.floor((tax2 * 20) / 19 + 1);
  let tax4 = Math.floor(tax2 + tax3 + args2);
  if (!args2)
    return message.reply(`
> ** Error It Must Be A Number ⚠⚠ **`);
  if (isNaN(args2))
    return message.reply(`
> ** Error It Must Be A Number ⚠⚠ **`);
  if (args2 < 1)
    return message.reply(`
> ** Error It Must Be Larger Than 1 ⚠⚠ **`);
  let m = await message.reply({
    content: `
> <a:emoji_23:1044116322830786630> **Your Tax Is : __${tax}__**`,
  });
});

// image log ✅
client.on("messageDelete", async (message) => {
  if (log.server !== message.guild.id) return;
  if (message.attachments.size > 0) {
    const ImageLog = client.channels.cache.get(log.images);

    const embed = await logEmbedBuilder(
      "Image Deleted",
      `**By** ${message.author} 
**Image:**`,
      null,
      message.guild.iconURL({ dynamic: true })
    );
    embed.setImage(message.attachments.first().url);

    ImageLog.send({ embeds: [embed] });
  }
});

//Channel C ✅
client.on("channelCreate", async (channel) => {
  if (log.server !== channel.guild.id) return;
  let logs = await channel.guild.fetchAuditLogs({ type: 10 });
  let entry = logs.entries.first();
  const ChannelLogC = client.channels.cache.get(log.channels);
  const embed = await logEmbedBuilder(
    "Channel Created",
    `**Channel Name : ${channel.name}\n\nChannel ID : ${channel.id}**`,
    entry.executor,
    channel.guild.iconURL({ dynamic: true })
  );

  ChannelLogC.send({ embeds: [embed] });
});
//Channel D ✅
client.on("channelDelete", async (channel) => {
  if (log.server !== channel.guild.id) return;
  let logs = await channel.guild.fetchAuditLogs({ type: 12 });
  let entry = logs.entries.first();
  const ChannelLogD = client.channels.cache.get(log.channels);
  const embed = await logEmbedBuilder(
    "Channel Deleted",
    `**Channel Name : ${channel.name}**`,
    entry.executor,
    channel.guild.iconURL({ dynamic: true })
  );

  ChannelLogD.send({ embeds: [embed] });
});
//message D ✅
client.on("messageDelete", async (message) => {
  if (log.server !== message.guild.id) return;
  if (!message.content) return;
  const messageLogD = client.channels.cache.get(log.messages);
  const embed = await logEmbedBuilder(
    "Message Deleted",
    `**Message Content : ${message.content}**\n\n**In : ${message.channel}**\n\n**Author : ${message.author}**`,
    null,
    message.guild.iconURL({ dynamic: true })
  );

  messageLogD.send({ embeds: [embed] });
});
// messageLog U ✅
client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (log.server !== oldMessage.guild.id) return;
  if (!oldMessage.content || !newMessage.content) return;
  const messageLogU = client.channels.cache.get(log.messages);
  const embed = await logEmbedBuilder(
    "Message Updated",
    `**From : ${oldMessage.content}

To : ${newMessage.content}

In : ${newMessage.channel}**

**By : ${oldMessage.author}**`,
    oldMessage.author,
    newMessage.guild.iconURL({ dynamic: true })
  );

  messageLogU.send({ embeds: [embed] });
});
//add member ✅
client.on("guildMemberAdd", async (member) => {
  if (log.server !== member.guild.id) return;
  const memberlogA = client.channels.cache.get(log.members);

  const embed = await logEmbedBuilder(
    "Member Joined",
    `**Member :**${member.user}\n\n**ID : ${member.user.id}**`,
    member.author,
    member.guild.iconURL({ dynamic: true })
  );

  memberlogA.send({ embeds: [embed] });
});
// leave member ✅
client.on("guildMemberRemove", async (member) => {
  if (log.server !== member.guild.id) return;
  const memberlogL = client.channels.cache.get(log.members);
  const embed = await logEmbedBuilder(
    "Member Left",
    `**Member Tag : ${member.user.tag}\n\nMember ID : ${member.user.id}**`,
    null,
    member.guild.iconURL({ dynamic: true })
  );

  memberlogL.send({ embeds: [embed] });
});
//guildBanAdd ✅
client.on("guildBanAdd", async (member) => {
  if (log.server !== member.guild.id) return;
  const memberlogB = client.channels.cache.get(log.ban);
  const embed = await logEmbedBuilder(
    "Member Ban",
    `**Member Tag : ${member.user.tag}\n\nMember ID : ${member.user.id}**`,
    null,
    member.guild.iconURL({ dynamic: true })
  );

  memberlogB.send({ embeds: [embed] });
});
//guildBanRemove ✅
client.on("guildBanRemove", async (member) => {
  if (log.server !== member.guild.id) return;
  const memberlogUB = client.channels.cache.get(log.unban);
  const embed = await logEmbedBuilder(
    "Member UnBan",
    `**Member Tag : ${member.user.tag}\n\nMember ID : ${member.user.id}**`,
    null,
    member.guild.iconURL({ dynamic: true })
  );

  memberlogUB.send({ embeds: [embed] });
});
// mute text ✅
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (log.server !== oldMember.guild.id) return;

  const unMuted = oldMember.roles.cache
    .filter(
      (r) =>
        !newMember.roles.cache.map((ro) => ro.id)?.includes(r.id) &&
        r.name === "Muted-T"
    )
    ?.first();

  const Muted = newMember.roles.cache
    .filter(
      (r) =>
        !oldMember.roles.cache.map((ro) => ro.id)?.includes(r.id) &&
        r.name === "Muted-T"
    )
    ?.first();

  let state;

  if (unMuted) {
    state = {
      name: "Unmuted",
      log: log.unmuteText,
    };
  } else if (Muted) {
    state = {
      name: "Muted",
      log: log.muteText,
    };
  }

  if (!state) return;

  const muteLog = client.channels.cache.get(state.log);
  const embed = await logEmbedBuilder(
    `Member ${state.name}-Text`,
    `**Member Tag : ${newMember.user.tag}\n\nMember ID : ${newMember.user.id}**`,
    null,
    newMember.guild.iconURL({ dynamic: true })
  );

  muteLog.send({ embeds: [embed] });
});
// mute voice ✅
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (log.server !== oldMember.guild.id) return;

  const unMuted = oldMember.roles.cache
    .filter(
      (r) =>
        !newMember.roles.cache.map((ro) => ro.id)?.includes(r.id) &&
        r.name === "Muted-V"
    )
    ?.first();

  const Muted = newMember.roles.cache
    .filter(
      (r) =>
        !oldMember.roles.cache.map((ro) => ro.id)?.includes(r.id) &&
        r.name === "Muted-V"
    )
    ?.first();

  let state;

  if (unMuted) {
    state = {
      name: "Unmuted",
      log: log.unmuteVoice,
    };
  } else if (Muted) {
    state = {
      name: "Muted",
      log: log.muteVoice,
    };
  }

  if (!state) return;

  const muteLog = client.channels.cache.get(state.log);
  const embed = await logEmbedBuilder(
    `Member ${state.name}-Voice`,
    `**Member Tag : ${newMember.user.tag}\n\nMember ID : ${newMember.user.id}**`,
    null,
    newMember.guild.iconURL({ dynamic: true })
  );

  muteLog.send({ embeds: [embed] });
});
// warn ✅
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (log.server !== oldMember.guild.id) return;

  const unWarn = oldMember.roles.cache
    .filter(
      (r) =>
        !newMember.roles.cache.map((ro) => ro.id)?.includes(r.id) &&
        r.id === "1117101931941335060"
    )
    ?.first();

  const Warn = newMember.roles.cache
    .filter(
      (r) =>
        !oldMember.roles.cache.map((ro) => ro.id)?.includes(r.id) &&
        r.id === "1117101931941335060"
    )
    ?.first();

  let state;

  if (unWarn) {
    state = {
      name: "Warn-Removed",
      log: log.unwarn,
    };
  } else if (Warn) {
    state = {
      name: "Warn-Added",
      log: log.warn,
    };
  }

  if (!state) return;

  const warnLog = client.channels.cache.get(state.log);
  const embed = await logEmbedBuilder(
    `Member ${state.name}`,
    `**Member Tag : ${newMember.user.tag}\n\nMember ID : ${newMember.user.id}**`,
    null,
    newMember.guild.iconURL({ dynamic: true })
  );

  warnLog.send({ embeds: [embed] });
});
// timeout ✅
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (log.server !== oldMember.guild.id) return;

  const untimedout =
    oldMember.communicationDisabledUntilTimestamp &&
    !newMember.communicationDisabledUntilTimestamp;

  const timedout =
    newMember.communicationDisabledUntilTimestamp &&
    !oldMember.communicationDisabledUntilTimestamp;

  let state;

  if (untimedout) {
    state = {
      name: "Timeout",
      log: log.untimeout,
    };
  } else if (timedout) {
    state = {
      name: "Untimeout",
      log: log.timeout,
    };
  }

  if (!state) return;

  const timeoutLog = client.channels.cache.get(state.log);
  const embed = await logEmbedBuilder(
    `Member ${state.name}`,
    `**Member Tag : ${newMember.user.tag}\n\nMember ID : ${newMember.user.id}**`,
    null,
    newMember.guild.iconURL({ dynamic: true })
  );

  timeoutLog.send({ embeds: [embed] });
});
//voice ✅
client.on("voiceStateUpdate", async (oldState, newState) => {
  const user = newState.member.user;
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;
  const voiceLog = client.channels.cache.get(log.voice);
  if (
    (oldChannel && log.server !== oldChannel.guild.id) ||
    (newChannel && log.server !== newChannel.guild.id)
  )
    return;

  if (oldChannel && !newChannel) {
    const embed = await logEmbedBuilder(
      "Voice Left",
      `**Member : ${user}**\n\n **Voice Name : ${oldChannel.name}**`,
      null,
      oldChannel.guild.iconURL({ dynamic: true })
    );
    voiceLog.send({ embeds: [embed] });
  } else if (!oldChannel && newChannel) {
    const embed = await logEmbedBuilder(
      "Voice Join",
      `**Member : ${user}**\n\n **Voice Name : ${newChannel.name}**`,
      null,
      newChannel.guild.iconURL({ dynamic: true })
    );
    voiceLog.send({ embeds: [embed] });
  }
});
// log embed
async function logEmbedBuilder(logName, logMessage, actionBy, serverAvatar) {
  const embed = new MessageEmbed()
    .setTitle(logName)
    .setDescription(logMessage)
    .setThumbnail(serverAvatar)
    .setColor(color)
    .setTimestamp();

  if (actionBy) {
    const actionByName = actionBy.username;
    const actionByAvatar = actionBy.displayAvatarURL({ dynamic: true });

    embed.setFooter(`By ${actionByName}`, actionByAvatar);
  }

  return embed;
}

// warn dont touch!
client.on(`ready`, () => {
  setInterval(async function () {
    const serverID = "825059024557965332";

    const tempR = await db.get(`${serverID}-Temp_Roles`);

    if (!tempR) return;

    tempR.forEach(async (info) => {
      const server = client.guilds.cache.get(serverID);

      if (!server) return;

      let member = server.members.cache.get(info.userID);

      if (!member) return;

      if (info.time > 1000) {
        info.time = info.time - 5000;
        db.set(`${serverID}-Temp_Roles`, tempR);
      } else {
        let index = tempR.indexOf(info);

        const roleCheck = member.roles.cache.find(
          (r) => r.name === info.roleName
        );

        const role = server.roles.cache.find((r) => r.name === info.roleName);
        let reason;

        if (!role || !roleCheck) return tempR.splice(index, 1);

        const removeRole = await member.roles.remove(role).catch((e) => {
          member.send(
            `**Error While Removing The Role ${role.name} from You ... Please Contact Us To Remove It Manually\n\n${e}**`
          );
        });

        tempR.splice(index, 1);
        db.set(`${serverID}-Temp_Roles`, tempR);
      }
    });
  }, 5000);
});

client.on("messageCreate", async (message) => {
  if (
    message.guild.id !== "994294236063203451" ||
    message.channel.id !== "1044388718577991690" ||
    message.author.id !== "1042535831371513896" ||
    !message.embeds[0]
  )
    return;

  let reviewsCount = (await db.get("reviews-count")) || 0;

  reviewsCount++;

  db.set("reviews-count", reviewsCount);

  console.log(reviewsCount);
});

client.on("messageDelete", async (message) => {
  if (
    message.guild.id !== "994294236063203451" ||
    message.channel.id !== "1044388718577991690" ||
    message.author.id !== "1042535831371513896" ||
    !message.embeds[0]
  )
    return;

  let reviewsCount = (await db.get("reviews-count")) || 0;

  if (!reviewsCount) return;

  reviewsCount--;

  db.set("reviews-count", reviewsCount);

  console.log(reviewsCount);
});

// reviews db

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (!interaction.customId.startsWith("webhook_btn-")) return;

  const msgURL = interaction.customId.replace("webhook_btn-", "");

  const logChannel = interaction.guild.channels.cache.get(
    "1112134374410952805"
  );

  interaction.message.components[0].components[0].disabled = true;

  interaction.message.components[0].components[0].label =
    interaction.user.username;

  interaction.update({
    content: `> <:F16_50:933442859670065162> | ${interaction.user} , claimed order successfully.`,
    components: [interaction.message.components[0]],
  });

  logChannel.send({
    content: `> <:sk:1098919885347762287> | ${interaction.user} , claimed order ${msgURL}`,
  });
});







client.login(process.env.token);
