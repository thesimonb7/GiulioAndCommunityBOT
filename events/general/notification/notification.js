const Discord = require("discord.js")
const settings = require("../../../config/general/settings.json")
const illustrations = require("../../../config/general/illustrations.json")
const { isMaintenance } = require("../../../functions/general/isMaintenance")
const { replyMessage } = require("../../../functions/general/replyMessage")

module.exports = {
    name: `interactionCreate`,
    async execute(client, interaction) {
        if (!interaction.isButton()) return
        const maintenanceStatus = await isMaintenance(interaction.user.id)
        if (maintenanceStatus) return

        if (!interaction.customId.startsWith("notification")) return

        await interaction.deferUpdate().catch(() => { })

        if (interaction.customId.split(",")[1] != interaction.user.id) return replyMessage(client, interaction, "Warning", "Bottone non tuo", "Questo bottone è in un comando eseguito da un'altra persona, esegui anche tu il comando per poterlo premere")

        let utente = interaction.member || client.guilds.cache.get(settings.idServer).members.cache.get(interaction.user.id)
        if (!utente) {
            return replyMessage(client, interaction, "Error", "Non sei nel server", "Non sei più nel server, non puoi configurare i ruoli di notifica")
        }

        switch (interaction.customId.split(",")[2]) {
            case "1": {
                utente.roles.cache.has(settings.ruoliNotification.announcements) ? await utente.roles.remove(settings.ruoliNotification.announcements) : await utente.roles.add(settings.ruoliNotification.announcements)
            } break;
            case "2": {
                utente.roles.cache.has(settings.ruoliNotification.news) ? await utente.roles.remove(settings.ruoliNotification.news) : await utente.roles.add(settings.ruoliNotification.news)
            } break;
            case "3": {
                utente.roles.cache.has(settings.ruoliNotification.changelog) ? await utente.roles.remove(settings.ruoliNotification.changelog) : await utente.roles.add(settings.ruoliNotification.changelog)
            } break;
            case "4": {
                utente.roles.cache.has(settings.ruoliNotification.youtubeVideosCode) ? await utente.roles.remove(settings.ruoliNotification.youtubeVideosCode) : await utente.roles.add(settings.ruoliNotification.youtubeVideosCode)
            } break;
            case "5": {
                utente.roles.cache.has(settings.ruoliNotification.youtubeVideosGiulio) ? await utente.roles.remove(settings.ruoliNotification.youtubeVideosGiulio) : await utente.roles.add(settings.ruoliNotification.youtubeVideosGiulio)
            } break;
        }

        let embed = new Discord.MessageEmbed()
            .setTitle(interaction.message.embeds[0].title)
            .setDescription(interaction.message.embeds[0].description)
            .setThumbnail(illustrations.notification)
            .addField(`📋 Announcements - ${utente.roles.cache.has(settings.ruoliNotification.announcements) ? ":green_circle: ON" : ":red_circle: OFF"}`, "Annunci grossi e importanti relativi al canale e al server")
            .addField(`📰 News - ${utente.roles.cache.has(settings.ruoliNotification.news) ? ":green_circle: ON" : ":red_circle: OFF"}`, "Notizie piccole e leggere sul canale e sul server")
            .addField(`📝 Changelog - ${utente.roles.cache.has(settings.ruoliNotification.changelog) ? ":green_circle: ON" : ":red_circle: OFF"}`, "Tutte le novità, funzioni, comandi che vengono aggiunte al bot del server")
            .addField(`📱 YouTube GiulioAndCode - ${utente.roles.cache.has(settings.ruoliNotification.youtubeVideosCode) ? ":green_circle: ON" : ":red_circle: OFF"}`, "Nuovi video pubblicati sul canale GiulioAndCode")
            .addField(`✌ YouTube Giulio - ${utente.roles.cache.has(settings.ruoliNotification.youtubeVideosGiulio) ? ":green_circle: ON" : ":red_circle: OFF"}`, "Nuovi video pubblicati sul canale Giulio")

        let button1 = new Discord.MessageButton()
            .setEmoji("📋")
            .setCustomId(`notification,${interaction.user.id},1${interaction.customId.split(",")[3] ? ",setup" : ""}`)
            .setStyle(utente.roles.cache.has(settings.ruoliNotification.announcements) ? "SUCCESS" : "DANGER")

        let button2 = new Discord.MessageButton()
            .setEmoji("📰")
            .setCustomId(`notification,${interaction.user.id},2${interaction.customId.split(",")[3] ? ",setup" : ""}`)
            .setStyle(utente.roles.cache.has(settings.ruoliNotification.news) ? "SUCCESS" : "DANGER")

        let button3 = new Discord.MessageButton()
            .setEmoji("📝")
            .setCustomId(`notification,${interaction.user.id},3${interaction.customId.split(",")[3] ? ",setup" : ""}`)
            .setStyle(utente.roles.cache.has(settings.ruoliNotification.changelog) ? "SUCCESS" : "DANGER")

        let button4 = new Discord.MessageButton()
            .setEmoji("📱")
            .setCustomId(`notification,${interaction.user.id},4${interaction.customId.split(",")[3] ? ",setup" : ""}`)
            .setStyle(utente.roles.cache.has(settings.ruoliNotification.youtubeVideosCode) ? "SUCCESS" : "DANGER")

        let button5 = new Discord.MessageButton()
            .setEmoji("✌")
            .setCustomId(`notification,${interaction.user.id},5${interaction.customId.split(",")[3] ? ",setup" : ""}`)
            .setStyle(utente.roles.cache.has(settings.ruoliNotification.youtubeVideosGiulio) ? "SUCCESS" : "DANGER")

        let row = new Discord.MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)
            .addComponents(button3)
            .addComponents(button4)
            .addComponents(button5)

        if (interaction.customId.split(",")[3]) {
            let button6 = new Discord.MessageButton()
                .setLabel("Torna indietro")
                .setStyle("SECONDARY")
                .setCustomId("setupIndietro,2")

            let button7 = new Discord.MessageButton()
                .setLabel("Salta/Prossimo step")
                .setStyle("PRIMARY")
                .setCustomId("setupAvanti,2")

            let row2 = new Discord.MessageActionRow()
                .addComponents(button6)
                .addComponents(button7)

            interaction.message.edit({ embeds: [embed], components: [row, row2] })
        }
        else {
            interaction.message.edit({ embeds: [embed], components: [row] })
        }
    },
};
