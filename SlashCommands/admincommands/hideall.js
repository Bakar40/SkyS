const { EmbedBuilder , Discord , PermissionsBitField } = require('discord.js');
module.exports = {
  name:"hideall",
  description:"to hide all rooms",

  run: async(client, interaction, args) => {
    try {
              if(!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.editReply(`** 😕 You don't have permissions **`); 
  
  if (!interaction.guild.me.permissions.has('MANAGE_CHANNELS')) return interaction.editReply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`);

interaction.guild.channels.cache.each((channel) => { 
   channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
            VIEW_CHANNEL: false
            });
});
  interaction.editReply("> <a:wz_true:984008251286913064> **Done __Hidedd__ All Server Channels**")
} catch (err) {
      console.log(err)
  }
 }
}
