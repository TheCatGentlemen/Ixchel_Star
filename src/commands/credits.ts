import { CommandInteraction, CacheType } from "discord.js";
import Command from "../base/command";

export default class CreditsCommand extends Command {
    constructor() {
        super({"cmdName": "credits", "helpDescription": "shows how many credits you have (WIP)"});
    }

    override async execute(data: CommandInteraction<CacheType>): Promise<void> {
        data.reply(`credits (wip)`);
    }
}


