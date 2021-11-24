const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../color.js");


module.exports = {
  name: "csomagol",
  aliases: ["becsomagol"],
  description: "Show Member PP Size!",
  usage: "Dicksize <Mention Member>",
  run: async (client, message, args) => {
    //Start
    let sizes = [
      "ceruzát",
      "radírt",
      "tolltartót",
      "tollt",
      "táskát",
      "1000 forintost",
      "biciklit",
      "telefont",
      "fülhallgatót",
      "motort",
      "kocsit :O"
    ];

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = sizes[Math.floor(Math.random() * sizes.length)];

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Becsomagol`)
      .setDescription(`Becsomagoltad ${Member.user.username}-t`)
      .setFooter(`Által kért:${message.author.username}`)
      .setColor("#ff0000")
      .setTimestamp();


    message.channel.send(embed);
    console.log("lop was used")

    //End
  }
};