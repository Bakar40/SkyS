const { MessageEmbed, Discord, MessageActionRow, MessageButton} = require('discord.js');
module.exports = {
  name: "user",
  description: "to get more info about someone",
  options: [{
    name: "user",
    description: "user to get his info",
    type: 6,
    required: false,
  }],

  run: async (client, interaction, args) => {
    try {
      let user = interaction.options.get('user')
      if (user) {
        const wituserembed = new MessageEmbed()
               .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
     .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`**Joined Discord :**\n**<t:${parseInt(user.member.user.createdAt / 1000)}:R>**\n\n**Joined Server :**\n**<t:${parseInt(user.member.joinedAt / 1000)}:R>**`)
          .setThumbnail(user.user.avatarURL())
          .setColor("PURPLE")

        const xrow = new MessageActionRow()
          .addComponents(new MessageButton()
            .setStyle("LINK")
            .setLabel(`${user.user.username} Profile`)
            .setEmoji('1044116322830786630')
            .setURL(`https://discord.com/users/${user.user.id}`)
          )

        interaction.editReply({ embeds: [wituserembed], components: [xrow] })
      }
      if (!user) {
        const withoutuserembed = new MessageEmbed()
               .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
     .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`**Joined Discord :**\n**<t:${parseInt(interaction.member.user.createdAt / 1000)}:R>**\n\n**Joined Server :**\n**<t:${parseInt(interaction.member.joinedAt / 1000)}:R>**`)
          .setThumbnail(interaction.user.avatarURL())
          .setColor("PURPLE")

        const xrow = new MessageActionRow()
          .addComponents(new MessageButton()
            .setStyle("LINK")
            .setLabel(`${interaction.user.username} Profile`)
            .setEmoji('1044116322830786630')
            .setURL(`https://discord.com/users/${interaction.user.id}`)
          )

        interaction.editReply({ embeds: [withoutuserembed], components: [xrow] })
      }
    } catch (err) {
      console.log(err)
    }
  }
}