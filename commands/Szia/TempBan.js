module.exports = {
    config: {
        name: "tempban",
        description: "Időre kitiltás",
        usage: "[felhasználónév | becenév | említés | ID] <indok> (választható)",
        category: "👮 | Moderációs Parancsok",
        accessableby: "Moderation",
        noalias: "No Aliases"
    },
    run : async(client, message, args) => {
         if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**Nincs jogosultságod a kitiltáshoz! :no_entry: - [BAN_MEMBERS]**");
        const member = message.mentions.members.first()
        if(!member) return  message.reply('**Kérlek említs meg egy felhasználót a kitiltáshoz!** :warning: ') 

        const time = args [1]
        if(!time) return message.reply('**Kérlek add meg mennyi időre bannoljak!** :warning: ') 

        await member.ban()

        const embed = new MessageEmbed()
        .setTitle('Kitiltás')
        .setDescription(`<@${member.user.id}> **Ki lett tilta ennyi időre ${time}.**`)
        .addField('**Általa:**', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)


        setTimeout(async () => {
            await message.guild.members.unban(member)

        }, ms(time))


    }
}
