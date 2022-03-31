module.exports = {
    name: "test",
    aliases: ["prova", "ping"],
    onlyStaff: false,
    availableOnDM: true,
    description: "Info di debug del bot",
    syntax: "!test",
    category: "general",
    channelsGranted: [settings.idCanaliServer.commands],
    async execute(message, args, client, property) {
        var embed = new Discord.MessageEmbed()
            .setTitle("GiulioAndCommunity BOT")
            .setThumbnail("https://i.postimg.cc/pLYkGfD1/Profilo-bot.png")
            .setColor("#6CA1FF")
            .addField(":stopwatch: Uptime", "```" + `${ms(client.uptime, { long: true })} - ${moment(new Date().getTime() - client.uptime).format("ddd DD MMM, HH:mm:ss")}` + "```")
            .addField(":turtle: Ping", "```" + `${(new Date().getMonth() == 3 && new Date().getDate() == 1) ? Math.floor(Math.random() * (1000 + 1000 + 1)) - 1000 : client.ws.ping}ms` + "```", true)
            .addField(":floppy_disk: Ram", "```" + `${(new Date().getMonth() == 3 && new Date().getDate() == 1) ? Math.floor(Math.random() * (1000000 - 0 + 1)) + 0 : (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` + "```", true)

        message.channel.send({ embeds: [embed] })
            .catch(() => { })
    },
};