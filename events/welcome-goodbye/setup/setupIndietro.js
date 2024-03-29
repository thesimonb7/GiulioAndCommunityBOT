const Discord = require("discord.js")
const illustrations = require("../../../config/general/illustrations.json")
const settings = require("../../../config/general/settings.json")
const colors = require("../../../config/general/colors.json")
const { isMaintenance } = require("../../../functions/general/isMaintenance");

module.exports = {
    name: `interactionCreate`,
    async execute(client, interaction) {
        if (!interaction.isButton()) return
        if (!interaction.customId.startsWith("setupIndietro")) return

        await interaction.deferUpdate().catch(() => { })

        const maintenanceStatus = await isMaintenance(interaction.user.id)
        if (maintenanceStatus) return

        switch (interaction.customId.split(",")[1]) {
            case "2": {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`:wave: Benvenuto ${interaction.user.username}`)
                    .setColor(colors.blue)
                    .setImage(illustrations.banner)
                    .setDescription(`Ciao, benvenuto all'interno del server **GiulioAndCommunity**. In questo server potrai **parlare** e** divertirti** con tantissimi utenti tutti i giorni
Prima di partecipare al server leggi tutte le <#${settings.idCanaliServer.rules}> da rispettare e tutte le <#${settings.idCanaliServer.info}> sui tantissimi **comandi**, **funzioni** e canali nel server

:bust_in_silhouette: Prosegui per **configurare** il tuo profilo nel server con il bottone **"Configura profilo"** e impostare cose molto interessanti...
`)

                let button1 = new Discord.MessageButton()
                    .setLabel("Configura profilo")
                    .setStyle("PRIMARY")
                    .setCustomId("setupAvanti,1")

                let row = new Discord.MessageActionRow()
                    .addComponents(button1)

                interaction.message.edit({ embeds: [embed], components: [row] })
            } break
            case "3": {
                let utente = client.guilds.cache.get(settings.idServer).members.cache.get(interaction.user.id)
                if (!utente) return

                let embed = new Discord.MessageEmbed()
                    .setTitle(`Configura NOTIFICHE`)
                    .setThumbnail(illustrations.notification)
                    .setDescription(`All'interno del server non viene mai utilizzato il tag @everyone, ma semplici ruoli per diversi scopri di notifiche

Seleziona quali **notifiche** vuoi ricevere
_Potrai poi modificarle con il comando \`/notification\`_`)
                    .addField(`📋 Announcements - ${utente.roles.cache.has(settings.ruoliNotification.announcements) ? ":green_circle: ON" : ":red_circle: OFF"}`, "Annunci grossi e importanti relativi al canale e al server")
                    .addField(`📰 News - ${utente.roles.cache.has(settings.ruoliNotification.news) ? ":green_circle: ON" : ":red_circle: OFF"}`, "Notizie piccole e leggere sul canale e sul server")
                    .addField(`📝 Changelog - ${utente.roles.cache.has(settings.ruoliNotification.changelog) ? ":green_circle: ON" : ":red_circle: OFF"}`, "Tutte le novità, funzioni, comandi che vengono aggiunte ai bot del server")
                    .addField(`📱 YouTube GiulioAndCode - ${utente.roles.cache.has(settings.ruoliNotification.youtubeVideosCode) ? ":green_circle: ON" : ":red_circle: OFF"}`, "Nuovi video pubblicati sul canale GiulioAndCode")
                    .addField(`✌ YouTube Giulio - ${utente.roles.cache.has(settings.ruoliNotification.youtubeVideosGiulio) ? ":green_circle: ON" : ":red_circle: OFF"}`, "Nuovi video pubblicati sul canale Giulio")

                let button1 = new Discord.MessageButton()
                    .setEmoji("📋")
                    .setCustomId(`notification,${interaction.user.id},1,setup`)
                    .setStyle(utente.roles.cache.has(settings.ruoliNotification.announcements) ? "SUCCESS" : "DANGER")

                let button2 = new Discord.MessageButton()
                    .setEmoji("📰")
                    .setCustomId(`notification,${interaction.user.id},2,setup`)
                    .setStyle(utente.roles.cache.has(settings.ruoliNotification.news) ? "SUCCESS" : "DANGER")

                let button3 = new Discord.MessageButton()
                    .setEmoji("📝")
                    .setCustomId(`notification,${interaction.user.id},3,setup`)
                    .setStyle(utente.roles.cache.has(settings.ruoliNotification.changelog) ? "SUCCESS" : "DANGER")

                let button4 = new Discord.MessageButton()
                    .setEmoji("📱")
                    .setCustomId(`notification,${interaction.user.id},4,setup`)
                    .setStyle(utente.roles.cache.has(settings.ruoliNotification.youtubeVideosCode) ? "SUCCESS" : "DANGER")

                let button5 = new Discord.MessageButton()
                    .setEmoji("✌")
                    .setCustomId(`notification,${interaction.user.id},5,setup`)
                    .setStyle(utente.roles.cache.has(settings.ruoliNotification.youtubeVideosGiulio) ? "SUCCESS" : "DANGER")

                let row = new Discord.MessageActionRow()
                    .addComponents(button1)
                    .addComponents(button2)
                    .addComponents(button3)
                    .addComponents(button4)
                    .addComponents(button5)

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
            } break
            case "4": {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Configura COMPLEANNO`)
                    .setColor("#FF1180")
                    .setThumbnail(illustrations.birthdayTodayNotSetted)
                    .setDescription(`Imposta il giorno del tuo **compleanno** in modo da ricevere dal bot e dagli utenti tanti **auguri** e **regali** personalizzati
        
Configura il compleanno con il comando \`/setbirthday [month] [day]\` nel canale <#${settings.idCanaliServer.commands}>
_Una volta settato non potrai più modificarlo_`)
                    .addField(":gift: I regali che riceverai", `
Ogni anno al giorno del tuo compleanno riceverai:
- Punti **esperienza** per salire di livello
- **Coins** da utilizzare nell'economia
- 4 oggetti random dallo **shop** che poi potrai vendere e commerciare
- **Boost x2** livellamento per tutto il giorno`)

                let button1 = new Discord.MessageButton()
                    .setLabel("Torna indietro")
                    .setStyle("SECONDARY")
                    .setCustomId("setupIndietro,3")

                let button2 = new Discord.MessageButton()
                    .setLabel("Configurazione completata")
                    .setStyle("PRIMARY")
                    .setCustomId("setupAvanti,3")

                let row = new Discord.MessageActionRow()
                    .addComponents(button1)
                    .addComponents(button2)

                interaction.message.edit({ embeds: [embed], components: [row] })
            } break
        }
    },
};
