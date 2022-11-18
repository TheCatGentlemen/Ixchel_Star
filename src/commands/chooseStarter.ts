import { CommandInteraction, CacheType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js";
import Command, { CommandEvents } from "../base/command";

export default class PingCommand extends Command {
    constructor() {
        super({"cmdName": "choosestarter", "helpDescription": "ping description"});
    }

    override async execute(data: CommandInteraction<CacheType>): Promise<void> {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('test_starter')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary),
        );

   

        // @ts-ignore
        await data.reply({ content: 'I think I should test this - a wise cat', components: [row] });

        this.emit(CommandEvents.RegisteredButton, ["test_starter"]);

        let clickedtimes: number = 0;
        this.on(CommandEvents.OwnedButtonClicked, (buttoninteraction: ButtonInteraction<CacheType>) => {
            buttoninteraction.message.edit(`Ah yes a button click. you clicked it ${clickedtimes}`);
        })
    }
}


