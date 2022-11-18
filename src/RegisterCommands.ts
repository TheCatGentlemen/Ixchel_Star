import * as Discord from "discord.js";
import Command from "./base/command";
import GetCommands from "./getcmds";

let commands: Discord.Collection<string, Command> = new Discord.Collection();


export default async function RegistersInteraction(token: string) {
    GetCommands().forEach(command => {
        commands.set(`${command.CommandName}`, command);
    });


    const rest = new Discord.REST({ version: '10' }).setToken(token);
    let f: any[] = [];
    commands.forEach(async command => {
        try {
            process.stdout.write(`Registering ${command.CommandName}.\n`);

			f.push({"name": command.CommandName, "type": 1, "description": command.HelpDescription});
            
        } catch (error) {
            console.log(error);
        }
        return true;
    });
    await rest.put(
        // change later when stopping testing
        Discord.Routes.applicationGuildCommands("1042600454804230154", "1042613724525109368"),
        {body: [...f]}
    )
}

