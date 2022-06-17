const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { User } = require("../utils/schemas")
const prettyMilliseconds = require ('pretty-ms');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("beg stranger for money"),
    run: async (interaction) => {
      
      const user = interaction.member.user
        const userData = await User.findOne({ id: user.id }) || new User({ id: user.id })
        const embed = new MessageEmbed({ color: "YELLOW" })
        
        if(userData.cooldowns.beg > Date.now())
        return interaction.reply ({
          
          embeds: [
            
            embed.setDescription(`👨‍✈️ Stop Begging so much, wait for **\`${prettyMilliseconds(userData.cooldowns.beg - Date.now(), { verbose: true, second sDecimalDigits: 0 })}\`**`)
             ],
          ephemeral: true
          
        })

const amount = Math.floor((Math.round(10 / (Math.random() * 10 + 1)) * 10) / 2)

if(amount <= 5) {
  userData.cooldowns.beg = Date.now() + (1000 * 60)
  userData.save()
  
  return interaction.reply({
    
  embeds: [embeds.setDescription("🥺 You got nothing this time, maybe try hard next time?")],
  })
  
}

userData.wallet += amount
userData.cooldowns.beg = Date.now + (1000 * 60)
userData.save()

 return interaction.reply({
  embeds: [

   embeds.setDescription(`oh my! you begged and earned \` ${amount} 🪙 \``)
   
    ]
 })
    }
}
