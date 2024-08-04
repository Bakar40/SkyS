const { MessageEmbed, Discord } = require('discord.js');
module.exports = {
  name: "say",
  description: "to send something with bot",
  options : [{
    name: "text",
    description: "the text you want to send with bot",
    type : 3,
    required: true,
  }],

  run: async (client, interaction, args) => {
    try {
      let text = interaction.options.getString('text')
      interaction.editReply({ content: ` **${text}** ` , ephemeral: true})
    } catch (err) {
      console.log(err)
    }
  }
}