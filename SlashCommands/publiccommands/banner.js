const { MessageEmbed , Discord } = require('discord.js');
const axios = require('axios')
module.exports = {
  name:"banner",
  description:"to get banner of someone",
  options : [{
    name : "user",
    description : "user to get his banner",
    type: 6,
    required: false,
  }],

  run: async(client, interaction, args) => {
    try {
 let user = interaction.options.getUser('user')
    if (!user) user = interaction.user
                   const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
                  headers: {
                        Authorization: `Bot ${process.env.token}`
               }
             }).then(d => d.data);
             if(data.banner){
               let url = data.banner.startsWith("a_")?".gif?size=4096":".png?size=4096";
                  url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
interaction.editReply({embeds: [
    new MessageEmbed()
     .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true}) })
     .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
     .setImage(url)
     .setDescription(`**[Download Banner](${url})**`)
     .setColor(`PURPLE`)
     .setTimestamp()
]});
             } else {
    interaction.editReply({content: `**${user.username}, Dont have banner 😕**`})
             }
} catch (err) {
      console.log(err)
  }
 }
}