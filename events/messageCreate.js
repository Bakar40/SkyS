const client = require("../index");

const { Client, Collection , MessageActionRow , MessageButton , MessageSelectMenu , Modal , TextInputComponent , MessageEmbed } = require("discord.js");

client.on("messageCreate", async (message) => {


if (message.webhookId) {

if (message.channel.parent?.id !== "1099639735502241822" && message.channel.parent?.id !== "1102278609466560643" && message.channel.parent?.id !== "1098770404216152084") return;

if (!message.embeds[0]) return;

message.react("<:eyesUnamuseda:1108491591645134968>")
  
}

      
if (message.webhookId) {

if (message.channel.parent?.id !== "1098770404216152084") return;

if (!message.embeds[0]) return;

let webhooks = await message.channel.fetchWebhooks();

webhooks = webhooks.filter(wb => wb.name === "SkyRise | Order System").map(wb => wb)

let Webhook
  
  if (!webhooks[0]) {
Webhook = await message.channel.createWebhook("SkyRise | Order System") 
  }

Webhook = Webhook || webhooks[0]

if (Webhook.id === message.webhookId) return;

const msgUrl = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
  
const row = new MessageActionRow()
.addComponents(new MessageButton()
.setCustomId('webhook_btn-' + msgUrl)
.setLabel('Claim Order !')
.setEmoji('933442859670065162')
.setStyle("SECONDARY"));

Webhook.send({
content:'> <:sk:1098919885347762287> | For claim order , press the button below.',
components:[row]
})
             
}

    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});