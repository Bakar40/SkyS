const { MessageEmbed, Discord } = require('discord.js');
module.exports = {
  name: "say-embed",
  description: "to send embed with bot",
  options : [
    {
    name: "text",
    description: "the text you want to send with bot",
    type : "STRING",
    required: true,
  },
    {
      name: "image",
      description: "Url",
        type: "STRING",
         required: false,
    },
    {
      name: "title",
      description: "Title",
        type: "STRING",
         required: false,
    },
            ],

  run: async (client, interaction, args) => {
    try {
      let text = interaction.options.getString('text')
      const url = interaction.options.getString('image')
    const title = interaction.options.getString('title')
      interaction.deleteReply()
      interaction.channel.send({ embeds: [
        new MessageEmbed()        .setDescription(`**${text}**`)
.setThumbnail(interaction.guild.iconURL({dynamic:true}))
.setImage(url || null)
.setTitle(title || null)
      ]})
    } catch (err) {
      console.log(err)
    }
  }
}