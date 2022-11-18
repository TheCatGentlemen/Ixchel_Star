import { CommandInteraction, CacheType } from "discord.js";
import Command from "../base/command";

export default class DenListCommand extends Command {
    public page: number;

    constructor() {
        super({"cmdName": "listdens", "helpDescription": "Get a list of already existing dens."});
        
        this.page = 0;
    }

    override async execute(data: CommandInteraction<CacheType>): Promise<void> {
        
    }
}