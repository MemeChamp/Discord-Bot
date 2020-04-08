const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: 'hello',
    execute(message, args) {
        message.react('👋')
        if (!message.guild.me.hasPermission('USE_EXTERNAL_EMOJIS')){
            return message.channel.send('Hello!')
        }
        return message.channel.send('Hello <:Acorn:695433401443942481>')
    }
};