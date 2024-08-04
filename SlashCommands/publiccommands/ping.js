const { MessageEmbed, Discord } = require('discord.js');
module.exports = {
  name: "ping",
  description: "ping of bot",

  run: async (client, interaction, args) => {
    try {
      interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setDescription(`
    🏓 Pong 🏓 
    
   Latency is ${interaction.createdTimestamp - interaction.createdTimestamp}ms. 
   API Latency is ${Math.round(client.ws.ping)}ms
   Ws Ping Is ${client.ws.ping}`)
          .setColor(color)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        ]
      })
    } catch (err) {
      console.log(err)
    }
  }
}