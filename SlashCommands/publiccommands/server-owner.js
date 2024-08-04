const { MessageEmbed, Discord } = require('discord.js');
module.exports = {
  name: "server-owner",
  description: "to view the server owner",

  run: async (client, interaction, args) => {
    try {
      interaction.editReply({ content: `<a:emoji_44:1041003266827366491> The Server Owner Is : <@!${interaction.guild.ownerId}> ` })
    } catch (err) {
      console.log(err)
    }
  }
}