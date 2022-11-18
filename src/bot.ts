import { CommandEvents } from "./base/command";
import Command from "./base/command";
import * as Discord from "discord.js";
import * as fs from "fs";

interface Ibuttoninfo {
    id: string,
    cmdname: string
}

let commands: Discord.Collection<string, Command> = new Discord.Collection();


let Buttons: Ibuttoninfo[] = [];

async function ParseInteraction(interaction: Discord.Interaction<Discord.CacheType>) {
    if (interaction.client.application.id !== interaction.applicationId) return;
    if (interaction.isChatInputCommand()) {
        let commandexec = commands.get(interaction.commandName);
        if (commandexec !== undefined) {
            commandexec.on(CommandEvents.RegisteredButton, async (buttoninfo: any) => {
                
            })

            await commandexec.execute(interaction);
        }
    };
}

export default class Bot extends Discord.Client {
    private botoptions: object;

    constructor(options: object) {
        super({intents: ["Guilds", "GuildMembers", "GuildMessageReactions"]});

        this.botoptions = options;
    }

    public async StartBot() {
        let pingcmd = new (require("./commands/ping"))["default"];
        commands.set(pingcmd.CommandName, pingcmd);

        this.on("interactionCreate", ParseInteraction);

        //@ts-ignore
        this.login(this.botoptions["Token"]);
    }

    public async StopBot() {
        this.destroy();
    }
}

