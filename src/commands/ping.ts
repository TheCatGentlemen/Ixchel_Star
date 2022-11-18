import { CommandInteraction, CacheType } from "discord.js";
import Command from "../base/command";

export default class PingCommand extends Command {
    constructor() {
        super({"cmdName": "ping", "helpDescription": "ping description"});
    }

    override async execute(data: CommandInteraction<CacheType>): Promise<void> {
        data.reply(`Pong! Command (different due to commands being slower) Pong latency is ${Date.now() - data.createdTimestamp}ms`);
    }
}


