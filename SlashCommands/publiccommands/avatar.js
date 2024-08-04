const { MessageEmbed , Discord , MessageActionRow, MessageButton, ButtonStyle } = require('discord.js');
module.exports = {
  name:"avatar",
  description:"getting avatar profile",
  options : [{
    name: "user",
    description : "user to get his avatar",
    type : 6,
    required: false,
  }],

  run: async(client, interaction, args) => {
    try {
     let ff = interaction.options.getUser('user') || interaction.member;    
        let userr = interaction.member.guild.members.cache.get(ff.id)

    var button = new MessageActionRow()
   .addComponents(
     new MessageButton()
      .setStyle('LINK') 
.setEmoji('<a:emoji_23:1044116322830786630>')
.setLabel(`DOWNLOAD AVATAR`)
.setURL(userr.user.displayAvatarURL({ dynamic: true}))); 

    
interaction.editReply({embeds: [
          new MessageEmbed()
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
     .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
   .setDescription(`[Avatar link](${userr.user.displayAvatarURL({dynamic: true, size: 4096})})`)
   .setImage(userr.user.displayAvatarURL({ dynamic: true, size: 4096}))
] , components: [button]})

} catch (err) {
      console.log(err)
  }
 }
}