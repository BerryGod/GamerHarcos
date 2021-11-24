const { MessageEmbed } = require('discord.js');
const os = require('os');

module.exports = {
    name: 'botinfo',
    category: 'bot',
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Bot statisztikái')
            .setColor('#000000')
            .addFields(
                {
                    name: '🌐 Szerverek',
                    value: `${client.guilds.cache.size} Szerveren`,
                    inline: true,
                },
                {
                    name: '📺 Szobák',
                    value: `Összesen ${client.channels.cache.size} szobán van.`,
                    inline: true,
                },
                {
                    name: '👥 Szerver tagok',
                    value: `A szervereken ${client.users.cache.size} tag van.`,
                    inline: true,
                },
                {
                    name: '⏳ Ping',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true,
                },
            )
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());

        return message.channel.send(embed);
	console.log("botinfo was used")
    },
};

