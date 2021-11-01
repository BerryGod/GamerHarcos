module.exports = {
    name: "szia",
    category: "Szia parancs",
    description: "test command",
    run: async(bot, message, args) => {
        message.channel.send("Hello")
    }
}