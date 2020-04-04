const token = 'Njk1NzgzMTc4ODc4ODQ0OTM5.XofNtA.gkR8kYuJlzs8IHLtZr4ryswYi3I';
const discord = require('discord.js');
const bot = new discord.Client;
const client = bot;
const prefix = '/';

bot.on('ready', bot =>{
    console.log('Bot is up :)');
})

bot.on('message', message => {
    let msg = message.content.toLowerCase();
    let args = message.content.substring(prefix.length).split(' ');

    if (msg.includes(prefix + 'hello')){
        if (args[1]){
            return message.channel.send('yes')
        }
    message.channel.send('hi :)')
    }

    if (msg.includes(prefix + 'bye')){
        if (args[1]){
            return message.channel.send('no')
        }
    message.channel.send('bye :(')
    }

    if (msg.includes(prefix + 'say')){
        if (!args[1]){
            return message.channel.send('Please include what you want me to say.')
        }
    message.channel.send(args.slice(1).join(" "))
    }
})

bot.login(token);