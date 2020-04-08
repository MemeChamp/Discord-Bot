const token = 'Token';
const Discord = require('discord.js');
const bot = new Discord.Client;
const client = bot;
const prefix = '/';
const fs = require('fs');
var guildConf = require('./guildConf.json')
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
bot.on('ready', bot => {
    console.log('Bot is up :)');
})
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name, command);
}
bot.on('message', message => {
    if (!message.guild) {
        return;
    }
    let msg = message.content.toLowerCase();
    let args = message.content.substring(prefix.length).split(' ');

    if (!guildConf[message.guild.id]) {
        guildConf[message.guild.id] = {
            prefix: '/'
        }
    }
    fs.writeFile('./guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {
        if (err) console.log(err);
    })
    if (msg.startsWith(guildConf[message.guild.id].prefix + 'hello')) {
        bot.commands.get('hello').execute(message, args)
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'bye')) {
        bot.commands.get('bye').execute(message, args)
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'say')) {
        bot.commands.get('say').execute(message, args)
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'coin')) {
        bot.commands.get('coin').execute(message, args)
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'rng')) {
        if (!args[1]) {
            return message.channel.send('Please include a number.')
        }
        if (isNaN(args[1])) {
            return message.channel.send('Please include an actual number.')
        }
        let number = Math.floor(Math.random() * (args[1]));
        message.channel.send(number)
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'embed')) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Title')
            .setDescription('Description')
            .setImage('https://cdn.discordapp.com/attachments/696087445464416326/696087472182132847/Scene1.png')
            .setColor('#880e0e')
            .addField('Top', 'Bottom', true)
            .addField('Top', 'Bottom', true)
            .addField('Top', 'Bottom', true)

        message.channel.send(embed)
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'rps')) {
        if (!args[1]) {
            return message.channel.send('Please include your choice.')
        }

        let choices = ['rock', 'paper', 'scissors'];
        if (choices.includes((args[1]).toLowerCase())) {
            let number = Math.floor(Math.random() * 3);
            if (number == 1) {
                return message.channel.send('It was a tie, we both had ' + (args[1]).toLowerCase())
            }
            if (number == 2) {
                if ((args[1]).toLowerCase() == "rock") {
                    return message.channel.send('I won, I had paper.')
                }
                if ((args[1]).toLowerCase() == "paper") {
                    return message.channel.send('I won, I had scissors.')
                }
                if ((args[1]).toLowerCase() == "scissors") {
                    return message.channel.send('I won, I rock.')
                }
            }
            if (number == 0) {
                if ((args[1]).toLowerCase() == "rock") {
                    return message.channel.send('You won, I had scissors.')
                }
                if ((args[1]).toLowerCase() == "paper") {
                    return message.channel.send('You won, I had rock.')
                }
                if ((args[1]).toLowerCase() == "scissors") {
                    return message.channel.send('You won, I paper.')
                }
            }
        } else {
            return message.channel.send('Please include either: Rock, Paper, or Scissors.')
        }
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + '8ball')) {
        if (!args[2]) {
            return message.channel.send('Please ask a full questions.')
        }
        let number = Math.floor(Math.random() * 6);
        if (number == 0) {
            return message.channel.send('Yes, definitely so.')
        }
        if (number == 1) {
            return message.channel.send('No, definitely not.')
        }
        if (number == 2) {
            return message.channel.send('Ask again later.')
        }
        if (number == 3) {
            return message.channel.send('It is uncertain.')
        }
        if (number == 4) {
            return message.channel.send('Odds are not in your favor.')
        }
        if (number == 5) {
            return message.channel.send('Odds are in your favor.')
        }

    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'rate')) {
        let number = Math.floor(Math.random() * 101);
        if (!args[1]) {
            return message.channel.send('I would rate you a ' + number + '/100')
        } else {
            let user = message.mentions.users.first();
            if (!user) {
                return message.channel.send('Please include who you are rating.')
            }
            return message.channel.send('I would rate ' + user.username + ' a ' + number + '/100')

        }

    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'kill')) {
        let user = message.mentions.users.first();
        if (!user) {
            return message.channel.send('Please include who you are killing.')
        }
        return message.channel.send(message.author.username + ' Killed ' + user.username)
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'prefix')) {
        bot.commands.get('prefix').execute(message, args, guildConf)
    }


})

bot.login(token);