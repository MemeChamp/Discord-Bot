const Discord = require('discord.js');
const bot = new Discord.Client();
module.exports = {
    name: 'prefix',
    execute(message, args, guildConf) {
        if (!args[1]) {
            return message.channel.send('Please include the new prefix.')
        }
        guildConf[message.channel.id].prefix = (args[1]).toLowerCase();
        fs.writeFile('./guildConf.json', JSON.stringify(guildConf, null, 2), (err) => {
            if (err) console.log(err);
        })
        return message.channel.send('The new prefix for this server is "' + (args[1]).toLowerCase() + '"')
    }
};