const { MessageEmbed, Discord } = require('discord.js');
const color = require('../../config').color
const line = require('../../config').line
let { QuickDB } = require('quick.db')
let db = new QuickDB({filePath:"reviews.sqlite"}) 

module.exports = {
  name: "review",
  description: "to send your feedback about our company",
  options : [
    {
    name: "comment",
    description: "your comment",
    type : "STRING",
    required: true,
  },
    {
      name: "stars",
      description: "Rate Our Company",
      choices: [{name:"⭐⭐⭐⭐⭐",value:"5"},{name:"⭐⭐⭐⭐",value:"4"},{name:"⭐⭐⭐",value:"3"},{name:"⭐⭐",value:"2"},{name:"⭐",value:"1"}],
      type: "STRING", 
      required: true,
    },
        ],

  run: async (client, interaction, args) => {
    try {
      
      let comment = interaction.options.getString('comment')
      let stars = Number(interaction.options.getString('stars'))
      let starss = []
      
    for (i = 0; i !== stars;i++) {
        starss.push("⭐")
      }

    //if (interaction.channel.id !== "1098770411946258453") return interaction.editReply(`**You Can Only Use This Command In <#1098770411946258453>**`);
      
      interaction.deleteReply()
      interaction.channel.send({ embeds: [
        new MessageEmbed()  
.addFields(
		{ name: "👤 User", value: `Tag: ${interaction.user.tag}\nID: ${interaction.user.id}`},
    { name: '=============', value: '\u200B' },
    { name: "⭐ Rating", value: `${starss.join("")}\n${stars}/5`},
    { name: '=============', value: '\u200B' },
    { name: "📝 Comment", value: `${comment}`},
    { name: '=============', value: '\u200B' },

  )
.setThumbnail(interaction.guild.iconURL({dynamic:true}))
.setTitle("💬 Review")
.setColor(color)
.setImage(line)
      ]})
saveReviewsData(interaction,stars)
    } catch (err) {
      console.log(err)
    }
  }
}


async function saveReviewsData(source,stars) {

let reviewsDB = await db.get("reviews") || []
  
const rev = reviewsDB.filter(r => r.userID === source.user.id)?.map(r => r)[0] 

if (!rev) reviewsDB.push({userID:source.user.id , stars: stars});

if (rev) rev.stars = stars;

db.set("reviews", reviewsDB)

}