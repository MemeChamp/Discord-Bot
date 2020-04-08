const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: 'coin',
    execute(message, args) {
        let number = Math.floor(Math.random() * 2);
        if (number == 1) {
            message.channel.send('Heads')
        }
        if (number == 0) {
            message.channel.send('Tails')
        }
    }
};