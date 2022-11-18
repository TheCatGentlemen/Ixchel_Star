import { CommandInteraction, CacheType } from "discord.js";
import Command from "../base/command";

export default class PingCommand extends Command {
    constructor() {
        super({"cmdName": "exitden", "helpDescription": "wip"});
    }

    override async execute(data: CommandInteraction<CacheType>): Promise<void> {
        data.reply(`wip`);
    }
}


