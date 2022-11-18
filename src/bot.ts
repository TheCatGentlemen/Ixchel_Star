import { CommandEvents } from "./base/command";
import Command from "./base/command";
import * as Discord from "discord.js";
import RegistersInteraction from "./RegisterCommands";
import GetCommands from "./getcmds";

interface Ibuttoninfo {
    id: string,
    cmdname: string
}

type ISelectMenus = Ibuttoninfo;
type IModals = Ibuttoninfo;

let commands: Discord.Collection<string, Command> = new Discord.Collection();


let Buttons: Ibuttoninfo[] = [];
let SelectMenus: ISelectMenus[] = [];
let ModalsSubmit: IModals[] = [];

async function ParseInteraction(interaction: Discord.Interaction<Discord.CacheType>) {
    if (interaction.client.application.id !== interaction.applicationId) return;
    if (interaction.isButton()) {
        for (let i = 0; i < Buttons.length; i++) {
            if (Buttons[i].id === interaction.customId) {
                //try {
                    // Discord.ButtonInteraction<Discord.CacheType>
                    console.log(`To fix button undefined ${Buttons[i].cmdname}`)

                    const cmd = commands.get(Buttons[i].cmdname);
                    // @ts-ignore
                    cmd.emit(CommandEvents.OwnedButtonClicked, [interaction]);
                //} catch (error) {
                //    process.stderr.write(`for some reason a button owned by the bot is not created by any command: button id: ${interaction.customId} ${interaction.customId} != ${Buttons[i].id})\n`);
                //}
            }
        }
        return;
    }

    if (interaction.isSelectMenu()) {
        for (let i = 0; i < SelectMenus.length; i++) {
            if (SelectMenus[i].id === interaction.customId) {
                try {
                    // @ts-ignore
                    await commands.get(SelectMenus[i].cmdname).emit(CommandEvents.OwnedSelectMenuAnwsered, [interaction]);
                } catch (error) {
                    process.stderr.write(`for some reason a select menu owned by the bot is not created by any command: select menu id: ${interaction.customId} \n(${interaction.customId} != ${SelectMenus[i].id})\n`);
                }
            }
        }
        return;
    }

    if (interaction.isModalSubmit()) {
        for (let i = 0; i < ModalsSubmit.length; i++) {
            if (ModalsSubmit[i].id === interaction.customId) {
                try {
                    // @ts-ignore
                    await commands.get(ModalsSubmit[i].cmdname).emit(CommandEvents.OwnedSelectMenuAnwsered, [interaction]);
                } catch (error) {
                    process.stderr.write(`for some reason a modal submit owned by the bot is not created by any command: modal submit id: ${interaction.customId} \n${interaction.customId} != ${ModalsSubmit[i].id})\n`);
                }
            }
        }
    }

    if (interaction.isChatInputCommand()) {
        let commandexec = commands.get(interaction.commandName);
        if (commandexec !== undefined) {
            commandexec.on(CommandEvents.RegisteredButton, async (custom_id: string) => {
                // @ts-ignore
                Buttons.push({"cmdname": commandexec.commandName, "id": custom_id});
            });
            
            commandexec.on(CommandEvents.RegisterSelectMenu, async (custom_id: string) => {
                // @ts-ignore
                SelectMenus.push({"cmdname": commandexec.commandName, "id": custom_id})
            });

            commandexec.on(CommandEvents.RegisteredModal, async (custom_id: string) => {
                // @ts-ignore
                ModalsSubmit.push({"cmdname": commandexec.commandName, "id": custom_id});
            })

            await commandexec.execute(interaction);
        }
        return;
    };
}

export default class Bot extends Discord.Client {
    private botoptions: object;

    constructor(options: object) {
        super({intents: ["Guilds", "GuildMembers", "GuildMessageReactions"]});

        this.botoptions = options;
    }

    public async StartBot() {
        GetCommands().forEach(command => {
            console.log(command.CommandName);
            commands.set(command.CommandName, command);
        });

        // @ts-ignore
        RegistersInteraction(this.botoptions["Token"]);

        this.on("interactionCreate", ParseInteraction);

        process.addListener("SIGINT", this.StopBot);
        process.addListener("SIGTERM", this.StopBot);

        //@ts-ignore
        this.login(this.botoptions["Token"]);
    }

    public async StopBot() {
        this.destroy();
    }
}

