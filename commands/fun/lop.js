const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../color.js");


module.exports = {
  name: "kirabol",
  aliases: ["lop", "rabol", "elrabol"],
  description: "Show Member PP Size!",
  usage: "Dicksize <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
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
      .setTitle(`Lopás`)
      .setDescription(`${Member.user.username}tól elloptál egy \n${Result}`)
      .setFooter(`Által kért:${message.author.username}`)
      .setColor("#ff0000")
      .setTimestamp();


    message.channel.send(embed);
    console.log("lop was used")

    //End
  }
};