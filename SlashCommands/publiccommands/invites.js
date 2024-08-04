const { MessageEmbed , Discord } = require('discord.js');
var { inviteTracker } = require("discord-inviter")
module.exports = {
  name:"invites",
  description:"to get invites of someone",
  options : [{
    name : "user",
    description : "user to get His Invites",
    type: 6,
    required : false,
  }],

  run: async(client, interaction, args) => {
    try {
      let user = interaction.options.get('user')

if(!user) {
       var invite = await inviteTracker.getMemberInvites(interaction.member);
    interaction.editReply(`${interaction.user.username} Has Got ${invite.count} Invite(s) 
`);
}
if(user) {
         var invite2 = await inviteTracker.getMemberInvites(user.member);
    interaction.editReply(` ${user.user.username} Has Got ${invite2.count} Invite(s) 
`);
}
 } catch (err) {
      console.log(err)
  }
 }
}