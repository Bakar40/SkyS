const { MessageEmbed, Discord } = require('discord.js');
const color = require('../../config').color
const lineUrl = require('../../config').line
let { QuickDB } = require('quick.db')
let db = new QuickDB({filePath:"reviews.sqlite"}) 
const progressbar = require('string-progressbar');

module.exports = {
  name: "all-reviews",
  description: "get all company reviews",

  run: async (client, interaction, args) => {
    try {
const data = await getReviews()
const size = 5
const line = "▭"
const slider = "▬"
const total = data.total;
let Starts_5 = data.stars_5;
let Starts_4 = data.stars_4;
let Starts_3 = data.stars_3;
let Starts_2 = data.stars_2;
let Starts_1 = data.stars_1;

Starts_5 = progressbar.filledBar(total, Starts_5, size , line , slider);

Starts_4 = progressbar.filledBar(total, Starts_4, size , line , slider);

Starts_3 = progressbar.filledBar(total, Starts_3, size , line , slider);

Starts_2 = progressbar.filledBar(total, Starts_2, size , line , slider);

Starts_1 = progressbar.filledBar(total, Starts_1, size , line , slider);

const embed = new MessageEmbed()
.setTitle("Company Reviews")
.setImage(lineUrl)
.setThumbnail(interaction.guild.iconURL())
.setColor(color)
.addFields(
		{ name: '⭐⭐⭐⭐⭐' + ` %${Math.floor(Starts_5[1])}`, value: Starts_5[0] },
    { name: '=============', value: '\u200B' },
		{ name: '⭐⭐⭐⭐' + ` %${Math.floor(Starts_4[1])}` , value: Starts_4[0] },
    { name: '=============', value: '\u200B' },
    { name: '⭐⭐⭐' + ` %${Math.floor(Starts_3[1])}`, value: Starts_3[0] },
    { name: '=============', value: '\u200B' },
		{ name: '⭐⭐' + ` %${Math.floor(Starts_2[1])}`, value: Starts_2[0] },
   { name: '=============', value: '\u200B' },
  { name: '⭐' + ` %${Math.floor(Starts_1[1])}`, value: Starts_1[0] },
  { name: '=============', value: '\u200B' },
  { name: '👑 Total Reviews', value: `${total}` }, 
)

interaction.editReply({embeds:[embed]})
    
    } catch (err) {
      console.log(err)
    }
  }
}


async function getReviews() {

let reviewsDB = await db.get("reviews") || []

if (!reviewsDB[0]) return null;

const data = {}

data.total = reviewsDB.length ?? 0

data.stars_5 = reviewsDB.filter(r => r.stars === 5)?.length ?? 0

data.stars_4 = reviewsDB.filter(r => r.stars === 4)?.length ?? 0

data.stars_3 = reviewsDB.filter(r => r.stars === 3)?.length ?? 0

data.stars_2 = reviewsDB.filter(r => r.stars === 2)?.length ?? 0

data.stars_1 = reviewsDB.filter(r => r.stars === 1)?.length ?? 0

return data
  }