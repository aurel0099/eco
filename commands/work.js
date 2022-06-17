const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { User } = require("../utils/schemas")
const prettyMilliseconds = require ('pretty-ms');

const jobs = [
     "👨‍🏫 Teacher",
     "👨‍⚕️ Doctor",
     "👮 Police Officer",
     "👨‍🍳 Chef",
     "👨‍🚒 Firefighter",
     "🚌 Bus Driver",
     "👨‍🔬 Scientist",
     "📪 Post Man",
     "👨‍🏭 Engineer",
     "🧑‍🎨 Artist",
     "👨‍✈️ Pilot"
]

module.exports = {
    data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("work to earn money"),
    run: async (interaction) => {
      const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        
        if(userData.cooldowns.work > Date.now())
 return interaction.reply({
   embeds: [
     new MessageEmbed()
     .setColor("YELLOW")
     .setDescription(`⏰ you can work again in **\`${prettyMilliseconds(userData.cooldowns.work - Date.now(), {})}\`**`)
     ],
   ephemeral: true
 })
 
 const amount = Math.floor(Math.random() * (100 - 10 + 1)) + 10
 const job = jobs[Math.floor(Math.random() * jobs.length)]
 
 userData.wallet += amount
 userData.cooldowns.work = Date.now() + (100 * 60 * 60)
 userData.save()
 
 const workembed = new MessageEmbed()
 .setDescription(`You worked as a **\` ${job}\` ** and earned\` ${amount} 🪙\``)
 .setColor("YELLOW")
 
 return interaction.reply({embeds: [workembed] })
     }
}
