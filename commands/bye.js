const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: 'bye',
    execute(message, args) {
        if (args[1]) {
            return message.channel.send('no')
        }
        message.channel.send('bye :(')
    }
};