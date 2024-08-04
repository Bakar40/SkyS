  const client = require("../index");

client.on('ready' , async() => {
  console.log(`================
  
Bot Name : ${client.user.username}
Bot Tag : ${client.user.tag}
Bot Id : ${client.user.id}
Servers Count : ${client.guilds.cache.size}
Users Count : ${client.users.cache.size}

================`)
client.user.setStatus('dnd');
  let status = [`SkyRise - Services On Top`,];
  setInterval(()=>{
client.user.setActivity(status[Math.floor(Math.random()*status.length)]);
  },5000)
})