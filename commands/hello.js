const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: 'hello',
    execute(message, args) {
        return message.channel.send('Hello')
    }
};