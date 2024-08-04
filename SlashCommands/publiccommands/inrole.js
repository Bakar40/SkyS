const { MessageEmbed , Discord } = require('discord.js');
const moment = require('moment')
module.exports = {
  name: "inrole",
  description: "to get more info about role",
  options: [{
    name: "role",
    description: "the role",
    type: 8,
    required: true,
  }],

  run: async(client, interaction, args) => {
    try {
    let role = interaction.options.getRole('role')
    let map = interaction.guild.roles.cache.get(role.id).members.map(rr => `**<@${rr.id}> ( ${rr.id} )**`).join("\n")
        
   interaction.editReply({ embeds: [       
     new MessageEmbed()
     .setTitle(` Info About \`${role.name}\` `)
    .setColor('PURPLE')
     .setDescription(`> **Role Name : **\`${role.name}\`

**Members Count Have This Role :** \`${interaction.guild.roles.cache.get(role.id).members.size}\`



**Members :**
${map}


**Role Is Created At : **\`${moment(role.createdAt).format('DD/MM/YYYY h:mm' )} \`

`)
     .setTimestamp()
     .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
     .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
 ], split: true})


} catch (err) {
      console.log(err)
  }
 }
}