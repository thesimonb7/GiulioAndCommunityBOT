const Discord = require('discord.js');
const moment = require('moment');
const settings = require('../../../config/general/settings.json');
const log = require("../../../config/general/log.json")
const colors = require("../../../config/general/colors.json")
const { isMaintenance } = require("../../../functions/general/isMaintenance");

module.exports = {
    name: `guildUpdate`,
    async execute(client, oldGuild, newGuild) {
        const maintenanceStates = await isMaintenance()
        if (maintenanceStates) return

        if (newGuild.id != settings.idServer) return

        if (oldGuild.premiumSubscriptionCount != newGuild.premiumSubscriptionCount) return

        const fetchedLogs = await newGuild.fetchAuditLogs({
            limit: 1,
            type: 'GUILD_UPDATE',
        });

        const logs = fetchedLogs.entries.first();

        if (logs.executor.bot) return

        let embed = new Discord.MessageEmbed()
            .setTitle(":circus_tent: Guild update :circus_tent:")
            .setColor(colors.purple)
            .addField(":alarm_clock: Time", `${moment().format("ddd DD MMM YYYY, HH:mm:ss")}`)
            .addField(":brain: Executor", `${logs.executor.toString()} - ${logs.executor.tag}\nID: ${logs.executor.id}`)

        logs.changes.forEach(change => {
            switch (change.key) {
                case "afk_channel_id": change.old = client.channels.cache.get(change.old)?.name; change.new = client.channels.cache.get(change.new)?.name; break;
                case "banner_hash": change.old = oldGuild.bannerURL() ? `[Image link](${oldGuild.bannerURL()})` : null; change.new = newGuild.bannerURL() ? `[Image link](${newGuild.bannerURL()})` : null; break;
                case "default_message_notifications": change.old = change.old == 0 ? "ALL_MESSAGES" : change.old == 1 ? "ONLY_MENTIONS" : null; change.new = change.new == 0 ? "ALL_MESSAGES" : change.new == 1 ? "ONLY_MENTIONS" : null; break;
                case "explicit_content_filter": change.old = change.old == 0 ? "DISABLED" : change.old == 1 ? "MEMBERS_WITHOUT_ROLES" : change.old == 2 ? "ALL_MEMBERS" : null; change.new = change.new == 0 ? "DISABLED" : change.new == 1 ? "MEMBERS_WITHOUT_ROLES" : change.new == 2 ? "ALL_MEMBERS" : null; break;
                case "icon_hash": change.old = oldGuild.iconURL() ? `[Image link](${oldGuild.iconURL()})` : null; change.new = newGuild.iconURL() ? `[Image link](${newGuild.iconURL()})` : null; break;
                case "mfa_level": change.old = change.old == 0 ? "NONE" : change.old == 1 ? "ELEVATED" : null; change.new = change.new == 0 ? "NONE" : change.new == 1 ? "ELEVATED" : null; break;
                case "owner_id": change.old = client.users.cache.get(change.old)?.username; change.new = client.users.cache.get(change.new)?.username; break;
                case "rules_channel_id": change.old = client.channels.cache.get(change.old)?.name; change.new = client.channels.cache.get(change.new)?.name; break;
                case "system_channel_id": change.old = client.channels.cache.get(change.old)?.name; change.new = client.channels.cache.get(change.new)?.name; break;
                case "verification_level": change.old = change.old == 0 ? "NONE" : change.old == 1 ? "LOW" : change.old == 2 ? "MEDIUM" : change.old == 3 ? "HIGH" : change.old == 4 ? "VERY_HIGH" : null; change.new = change.new == 0 ? "NONE" : change.new == 1 ? "LOW" : change.new == 2 ? "MEDIUM" : change.new == 3 ? "HIGH" : change.new == 4 ? "VERY_HIGH" : null; break;
            }

            switch (change.key) {
                case "name": change.key = "Name"; break;
                case "afk_channel_id": change.key = "AFK Channel"; break;
                case "afk_channel": change.key = "AFK Timeout"; break;
                case "banner_hash": change.key = "Banner"; break;
                case "default_message_notifications": change.key = "Default Message notification level"; break;
                case "description": change.key = "Description"; break;
                case "explicit_content_filter": change.key = "Explicit content filter"; break;
                case "icon_hash": change.key = "Icon"; break;
                case "mfa_level": change.key = "Two-Factore auth requirement"; break;
                case "owner_id": change.key = "Owner"; break;
                case "preferred_locale": change.key = "Preferred locale"; break;
                case "region": change.key = "Region"; break;
                case "rules_channel_id": change.key = "Rule Channel"; break;
                case "system_channel_id": change.key = "System Channel"; break;
                case "vanity_url_code": change.key = "Vanity URL"; break;
                case "verification_level": change.key = "Required Verification level"; break;
            }

            if (!change.old) change.old = "_Null_"
            if (!change.new) change.new = "_Null_"

            embed
                .addField(change.key, `
Old: ${change.old}
New: ${change.new}
`)
        })

        client.channels.cache.get(log.server.server).send({ embeds: [embed] })
    },
};