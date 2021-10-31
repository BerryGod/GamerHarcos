const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({ disableEveryone: true });
const badwords = ["kurva", "anyád", "buzi", "geci", "Kurva", "Anyád", "Buzi", "Geci"]
const superagent = require('superagent');
const randomPuppy = require('random-puppy');


bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "Prefix: -",
        "Készítő: BerryGod",
        "-help"
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random() * státuszok.length)]

        bot.user.setActivity(status, { type: "STREAMING" })
    }, 3000)
})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if (cmd === `${prefix}hello`) {
        message.channel.send("Szia");
    }


    for (let i = 0; i < badwords.length; i++) {
        if (cmd == badwords[i]) {
            message.delete()
            message.reply("Ne káromkodj!");
        }
        i++
    }




    if (cmd === "-report") {
        // privát szűrése
        if (message.channel.type === 'dm') return message.reply("Itt nem tudod használni!");
        // felhasználó lekérése
        const report_usr = message.mentions.users.first();
        // csatorna id az egyszerűség kedvéért
        const channel_id = "904059507301285908";
        // 6 + 24 mivel prefix levágva = 30
        const indok = message.content.slice(30);

        // ha nincs felhasználó
        if (!report_usr) {
            return message.reply('Nem adtad meg a felhasználót!');
        }

        // ha nincs indok
        if (!indok) {
            return message.reply("Nem adtál meg indokot!");
        }

        //embed
        const embed = new Discord.MessageEmbed()
            .setTitle('Report')
            .setDescription(`*${report_usr} jelentve lett!*\n **Indoka: ${indok}**\n *Bejelentő: ${message.author.username}*\n`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setTimestamp()
            .setColor("RANDOM")
            // majd küldés
        bot.channels.cache.get(channel_id).send(embed)
    }



    if (message.content.startsWith('-bitcoin')) {
        const CoinGecko = require('coingecko-api');
        const CoinGeckoClient = new CoinGecko();
        let data = await CoinGeckoClient.simple.price({
            ids: ['bitcoin'],
            vs_currencies: ['huf', 'usd'],
        });
        console.log(data)
        let btcEmbed = new Discord.MessageEmbed()
            .setDescription(`Bitcoin ára`)
            .setColor("#ff1800")
            .setFooter(bot.user.username)
            .addField("Bitcoin ennyit ér: " + data.data.bitcoin.huf + " HUF ")
            .addField("Bitcoin ennyit ér: " + data.data.bitcoin.usd + " USD ")
            .setThumbnail("https://m.blog.hu/ma/malkav/image/best_of_troll_2.jpg")

        message.channel.send(btcEmbed);

    }

    if (cmd === `${prefix}Számolj`) {

        var plus = Math.floor(Number(args[0]) + Number(args[2]));
        if (isNaN(plus)) return message.channel.send("``Hiba: Kérlek adj meg számokat!``");

        var minus = Math.floor(args[0]) - (args[2]);
        if (isNaN(minus)) return message.channel.send("``Hiba: Kérlek adj meg számokat!``");

        var multiply = Math.floor(args[0]) * (args[2]);
        if (isNaN(multiply)) message.channel.send("``Hiba: Kérlek adj meg számokat!``");

        var divide = Math.floor(args[0]) / (args[2]);
        if (isNaN(divide)) return message.channel.send("``Hiba: Kérlek adj meg számokat!``");

        if (args[1] == "+") return message.channel.send(args[0] + " + " + args[2] + " = **" + plus + "**");
        if (args[1] == "-") return message.channel.send(args[0] + " - " + args[2] + " = **" + minus + "**");
        if (args[1] == "*") return message.channel.send(args[0] + " * " + args[2] + " = **" + multiply + "**");
        if (args[1] == "x") return message.channel.send(args[0] + " x " + args[2] + " = **" + multiply + "**");
        if (args[1] == "/") return message.channel.send(args[0] + " / " + args[2] + " = **" + divide + "**");

        else {
            message.channel.send("``Baszd fejbe magad``");
        }
    }
    if (cmd === `${prefix}meme`) {
        const subreddits = ["memes", "FostTalicska"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]

        const IMG = await randomPuppy(random)
        const MemeEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(IMG)
            .setTitle(`Keresési szöveg: ${random} (KATT IDE!)`)
            .setURL(`https://www.reddit.com/r/${random}`)

        message.channel.send(MemeEmbed)
    }
    
    if(cmd === `${prefix}serverinfo`){
    
        const { guild } = message
        const icon = message.guild.iconURL()
        const roles = message.guild.roles.cache.map(e => e.toString())
        const emojis = message.guild.emojis.cache.map(e =>  e.toString())
        const emojicount = message.guild.emojis.cache 
        const members = message.guild.members.cache
        const create = message.guild.createdAt.toLocaleDateString()
    
        const szerveriEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Szerver Info')
        .setThumbnail(`${icon}`)
        .addField('Szerver tulaj:-', guild.owner)
        .addField('Szerver ID:-', guild.id)
        .addField('server létrehozása:-', create)
        .addField('Boosts:-', guild.premiumSubscriptionCount)
        .addField('Boost Level:-', guild.premiumTier)
        .addField('Emojis számláló:-', `${emojicount.size}\n${emojicount.filter(emoji => !emoji.animated).size}(Non Animated)\n${emojicount.filter(emoji => emoji.animated).size}(Animated)`)
        .addField('Emojik:-', `${emojis}`, true) 
        .addField('Szerver Stat:-', `${guild.channels.cache.filter(channel => channel.type == 'text').size}⌨️\n${guild.channels.cache.filter(channel => channel.type == 'voice').size}🔈\n${guild.channels.cache.filter(channel => channel.type == 'news').size}📢\n${guild.channels.cache.filter(channel => channel.type == 'category').size}📁`)
        .setFooter('Szerver Info', icon)
 
 
        
        message.channel.send(szerveriEmbed)
        
    }


    if (cmd == `${prefix}Ping`) {
        message.channel.send(`Gamerharcos bot pingje a következő : **${bot.ws.ping}ms**`)
    }
})







bot.login(process.env.BOT_TOKEN);
