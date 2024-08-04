const { EmbedBuilder, Discord, PermissionsBitField } = require('discord.js');
module.exports = {
  name: "show",
  description: "to show a room",

  run: async (client, interaction, args) => {
    try {
      if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.editReply(`** 😕 You don't have permissions **`);

      if (!interaction.guild.me.permissions.has('MANAGE_CHANNELS')) return interaction.editReply(`** 😕 I couldn't edit the channel permissions. Please check my permissions and role position.**`);

      let everyone = interaction.guild.roles.cache.find(hyper => hyper.name === '@everyone');
      interaction.channel.permissionOverwrites.edit(everyone, {
        VIEW_CHANNEL: true
      }).then(() => {
        interaction.editReply(`**<a:wz_true:984008251286913064>  ${interaction.channel} Done Showed this room.**`)
      })

    } catch (err) {
      console.log(err)
    }
  }
}
