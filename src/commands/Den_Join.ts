import { CommandInteraction, CacheType } from "discord.js";
import Command from "../base/command";

export default class PingCommand extends Command {
    constructor() {
        super({"cmdName": "joinden", "helpDescription": "Join a already existing den."});
    }

    override async execute(data: CommandInteraction<CacheType>): Promise<void> {
        data.reply(`Pwip`);
    }
}


