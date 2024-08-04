const { EmbedBuilder , Discord , PermissionsBitField } = require('discord.js');
module.exports = {
  name:"ban",
  description:"to ban a member",
  options : [{
    name : "user",
    description: "user you want to ban",
    type: 6,
    required: true,
  }],

  run: async(client, interaction, args) => {
    try {
if (!interaction.member.permissions.has('BAN_MEMBERS')) return message.reply(`** 😕 You don't have permission **`);
  
    var user = interaction.options.getMember('user')
    if(!user.bannable) return interaction.editReply(`** ❌ You can't ban this user**`);
    await user.ban().catch(err => {console.log(err)});
     await interaction.editReply(`<a:wz_true:984008251286913064> **${user.user.tag} banned from the server!**✈️`);
      
} catch (err) {
      console.log(err)
  }
 }
}
