const { EmbedBuilder , Discord , PermissionsBitField } = require('discord.js');
module.exports = {
  name:"unbanall",
  description:"to unban a all members",

  run: async(client, interaction, args) => {
    try {
if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.editReply(`** 😕 You don't have permission **`);
      
   const serverban = client.guilds.cache.get(interaction.guild.id)
     interaction.guild.bans.fetch().then(bans => {
 bans.forEach(ban => {
 serverban.members.unban(ban.user.id)
 })
 }).then(() => {
 interaction.editReply({ content: `> <a:wz_true:984008251286913064> ** Done __Unbanned__ All Banlist **` })
 })  
      
} catch (err) {
      console.log(err)
  }
 }
}
