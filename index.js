const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({ disableEveryone: true });

const superagent = require('superagent');
const randomPuppy = require('random-puppy');
const { MessageEmbed } = require('discord.js');

const fs = require("fs");
const ms = require("ms");
const os = require('os');

const mineflayer = require('mineflayer')
const cmd = require('mineflayer-cmd').plugin

let rawdata = fs.readFileSync('config.json');
let data = JSON.parse(rawdata);
var lasttime = -1;
var moving = 0;
var connected = 0;
var actions = [ 'forward', 'back', 'left', 'right']
var lastaction;
var pi = 3.14159;
var moveinterval = 2; // 2 second movement interval
var maxrandom = 5; // 0-5 seconds added to movement interval (randomly)
var host = data["ip"];
var username = data["name"]
var nightskip = data["auto-night-skip"]
var bot = mineflayer.createBot({
  host: host,
  username: username
});
function getRandomArbitrary(min, max) {
       return Math.random() * (max - min) + min;

}

bot.loadPlugin(cmd)





///////////////////////////////////////////


//////////////////////////////////////////////////////////




bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)
    console.log("prefix: -")
    console.log("badwords   WORKING")
    console.log("report     WORKING")
    console.log("bitcoin    WORKING")
    console.log("számolj    WORKING")
    console.log("meme       WORKING")
    console.log("ping       WORKING")
    console.log("giveaway   WORKING")
    console.log("help       WORKING")
    console.log("clear      WORKING")
    console.log("cica       WORKING")
    console.log("addrole    WORKING")
    console.log("removerole WORKING")

    let státuszok = [
        "Prefix: -",
        "-help",
        "By: BerryGod"
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
})

bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;
    
//////////////////////////////////////////////////////////
    if (cmd === `${prefix}hello`) {
        message.channel.send("Szia");
    }
//////////////////////////////////////////////////////////
const badwords = ["buzi", "geci", "szar", "berryshit"]
        if(!message.member.hasPermission("ADMINISTRATOR")){
            let confirm = false

            let i;
            for(i = 0; i < badwords.length; i++){
             if(message.content.toLowerCase().includes(badwords[i].toLowerCase())){
                confirm = true
                }
            }
            if(confirm){
                message.delete()
                return message.channel.send("Ne káromkodj")
            }
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
    }
//////////////////////////////////////////////////////////
    if (cmd == `${prefix}ping`) {
        message.channel.send(`Gamerharcos bot pingje a következő : **${bot.ws.ping}ms**`)
    }
//////////////////////////////////////////////////////////
if(cmd === `${prefix}giveaway`){
            const messageArray = message.content.split(" ");
            if(!message.member.hasPermission("KICK_MEMBERS" || "BAN_MEMBERS")) return message.channel.send("Ehhez a parancshoz nincs jogod!")
 
            let tárgy = "";
            let idő;
            let winnerCount;
 
            for (let i = 1; i < args.length; i++){
                tárgy += (args[i] + " ")
                console.log(tárgy)
            }
 
            idő = args[0];
 
        if(!idő){
            return message.reply("Kérlek adj meg egy idő intervallumot! pl: 100s, 5h, 2d")
        }
        if(!tárgy){
            return message.reply("Kérlek add meg a nyereményjáték tárgyát!")
        }
 
        var Gembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Nyereményjáték!!!!")
        .setDescription(`Nyeremény: **${tárgy}**`)
        .addField("`Időtartam:`", ms(ms(idő), {long: true}), true)
        .setFooter("A jelentkezéshe reagálj ezzel: 🎉")
        var embedSend = await message.channel.send(Gembed);
        embedSend.react("🎉");
 
        message.delete
        setTimeout(async() => {
            try{
                const peopleReactedBOT =  await embedSend.reactions.cache.get("🎉").users.fetch();
                var peopleReacted = peopleReactedBOT.array().filter(u => u.id !== bot.user.id);
            }catch(e){
                return message.channel.send(`Hiba törtét a **${tárgy}** sorsolása során! Hiba: `+"`"+e+"`")
            }
            var winner;
 
            if(peopleReacted.length <= 0){
                return message.channel.send("Senki nem jelentkezett a nyereményjátékra! :C")
            } else {
                var index = Math.floor(Math.random() * peopleReacted.length);
                winner = peopleReacted[index]
            }
 
            if(!winner) {
                message.channel.send("Hiba történt a sorsolás során!")
            } else {
                message.channel.send(`🎉🎉🎉🎉 **${winner.toString()}** megnyerte ezt: **${tárgy}**`);
            }
        }, ms(idő))
        }

    
    if(message.content === "-help") {
        let embed = new MessageEmbed()
        .setTitle("Help!")
        .setDescription("Prefix: -")
        .setColor("RANDOM")
        .addField("-help", "Help command")
        .addField("-bitcoin", "A bitcoin árfolyamát kiírja")
        .addField("-giveaway     giveaway command", "Használat: -giveaway 100s Tárgy")
        .addField("-ping", "A bot pingje")
        .addField("-számolj", "A bot kiszámolja a matek feladványt    Használat: 3 + 3")
        .addField("-meme", "meme parancs (néha buggos)")
        .addField("-report", "Reportol egy embert amit csak az adminok látnak Használat: -report @egyember indok")
        .addField("-cica", "Egy cuki cicál generál")
        .addField("-clear", "clear parancs Használat: -clear (mennyi üzenetet szeretnél törölni)")
    message.channel.send(embed)
    }
    
    
    

    
    
    if (cmd === `${prefix}clear`) {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            if (args[0] && isNaN(args[0]) && args[0] <= 100 || 0 < args[0] && args[0] < 101) {

                let clearEmbed = new Discord.MessageEmbed()
                    .setTitle(`Törölve lett ${Math.round(args[0])} Üzenet a chatből!`)
                    .setColor("#ff1800")
                    .setAuthor(message.author.username)
                    .setTimestamp()

                message.channel.send(clearEmbed);


                message.channel.bulkDelete(Math.round(args[0]))


            }
        }
    }
    
    
    
    if(cmd === `${prefix}cica`) {
        let msg = await message.channel.send("Generálás...") 

        let {body} = await superagent
        .get(`http://aws.random.cat/meow`)
         
        if(!{body}) return message.channel.send("Nem sikerült a kép legenerálása!")

        let cEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setAuthor('CUKI MACSKA RIADÓ!', message.guild.iconURL())
        .setImage(body.file)
        .setTimestamp()
        .setFooter('By: BerryGod')

        message.channel.send(cEmbed)

        message.delete();
    }
    

    if(cmd === `${prefix}addrole`) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
        return message.channel.send("nincs jogod szerkeszteni a rangokat!");
      }
      if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
        return message.channel.send("Nincs jogom:");
      } 
      let target = message.mentions.members.first();
      
      if(!target) return message.reply(`HIBA! Kérlek adj megy egy embert!`)
      
      let arole = message.mentions.roles.first();
      
      if(!arole) return message.reply(`HIBA! Kérlek adj megy egy rangot!`)
      
      let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
      let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
      
        const embed = new Discord.MessageEmbed()
        
        .setColor("#ff1800")
        .setDescription(` ${target.user.username}-nek/nak oda lett adva: ${arole} nevű rang! `)
        
        await message.channel.send(embed)
        
        target.roles.add(arole)
    }

       
     if(cmd === `${prefix}removerole`) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
        return message.channel.send("nincs jogod szerkeszteni a rangokat!");
      }
      if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
        return message.channel.send("Nincs jogom:");
      } 
      let target = message.mentions.members.first();
      
      if(!target) return message.reply(`HIBA! Kérlek adj megy egy embert!`)
      
      let arole = message.mentions.roles.first();
      
      if(!arole) return message.reply(`HIBA! Kérlek adj megy egy rangot!`)
      
      let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
      let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
      
        const embed = new Discord.MessageEmbed()
        
        .setColor("#ff1800")
        .setDescription(` ${target.user.username}-nek/nak el lett véve tőle: ${arole} nevű rang! `)
        
        await message.channel.send(embed)
        
        target.roles.remove(arole)
    }
    
    
    
    if(cmd === `${prefix}kitagadunk`) {
        if (!message.member.permissions.has('KICK_MEMBERS')) return;
        

        const member = message.mentions.members.first();
        if(!member) return message.reply("Jelölj meg egy embert akit ki akarsz tagadni!");

        if(message.member.roles.highest.position <= 
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
        }
        
    
    
    
    
        bot.on('time', function(time) {
	    if(nightskip == "true"){
	    if(bot.time.timeOfDay >= 13000){
	    bot.chat('/time set day')
	    }}
        if (connected <1) {
            return;
        }
        if (lasttime<0) {
            lasttime = bot.time.age;
        } else {
            var randomadd = Math.random() * maxrandom * 20;
            var interval = moveinterval*20 + randomadd;
            if (bot.time.age - lasttime > interval) {
                if (moving == 1) {
                    bot.setControlState(lastaction,false);
                    moving = 0;
                    lasttime = bot.time.age;
                } else {
                    var yaw = Math.random()*pi - (0.5*pi);
                    var pitch = Math.random()*pi - (0.5*pi);
                    bot.look(yaw,pitch,false);
                    lastaction = actions[Math.floor(Math.random() * actions.length)];
                    bot.setControlState(lastaction,true);
                    moving = 1;
                    lasttime = bot.time.age;
                    bot.activateItem();
                }
            }
        }
    });

    bot.on('spawn',function() {
        connected=1;
    });

    bot.on('death',function() {
        bot.emit("respawn")
    });
    
    
  
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//////////////////////////////////////////////////////////
})

bot.login(process.env.BOT_TOKEN);
