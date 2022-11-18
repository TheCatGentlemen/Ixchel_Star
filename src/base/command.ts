import * as Discord from "discord.js";

export interface CommandInitOptions {
    cmdName: string,
    helpDescription: string,
}

export enum CommandEvents {
    RegisteredButton,
    OwnedButtonClicked,
    RegisterSelectMenu
}

export default class Command {
    private callbacks = {
        "RegisterButton": [],
        "OwnedButtonClicked": [],
        "RegisterSelectMenu": [],
    };
    public CommandName: string;
    public HelpDescription: string;
    
    constructor (cmdop: CommandInitOptions) {
        this.CommandName = cmdop.cmdName;
        this.HelpDescription = cmdop.helpDescription;
    }

    async execute(data: Discord.CommandInteraction<Discord.CacheType>): Promise<any> {
        return 0;
    }

    async emit(event: CommandEvents, Args: any[]) {
        //@ts-ignore
        let FunctionExec = this.callbacks[event.toString()];
        for (let i = 0; i < FunctionExec.length; i++) {
            await FunctionExec(Args);
        }
    }

    public on(event: CommandEvents, callback: CallableFunction) {
        //@ts-ignore
        this.callbacks[event.toString()].push(callback);
        return;
    }
}