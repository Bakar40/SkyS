const { EmbedBuilder , Discord , PermissionsBitField } = require('discord.js');
module.exports = {
  name:"kick",
  description:"to kick a member",
  options : [{
    name : "user",
    description: "user you want to kick",
    type: 6,
    required: true,
  }],

  run: async(client, interaction, args) => {
    try {
if (!interaction.member.permissions.has("KICK_MEMBERS")) return message.reply(`** 😕 You don't have permission **`);
          let user = interaction.options.getMember('user')
      
    if(user.roles.highest.position >= interaction.member.roles.highest.position && interaction.user.id !== interaction.guild.fetchOwner().id) return interaction.editReply(`** ❌ You can't kick this user**`);
      
    if(!user.kickable) return interaction.editReply(`** ❌ You can't kick this user**`);
      
    await user.kick().catch(err => {console.log(err)});
      
     await interaction.editReply(`<a:wz_true:984008251286913064> **${user.user.tag} Kicked from the server!**✈️`);
  
      
} catch (err) {
      console.log(err)
  }
 }
}
