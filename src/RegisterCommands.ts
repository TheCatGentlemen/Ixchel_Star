import * as Discord from "discord.js";
import Command from "./base/command";

let commands: Discord.Collection<string, Command> = new Discord.Collection();


export default async function RegistersInteraction(token: string) {
    const rest = new Discord.REST({ version: '10' }).setToken(token);
    let f: any[] = [];
    commands.every(async command => {
        try {
            process.stdout.write(`Registering ${command.CommandName}.\n`);

			f.push({"name": command.CommandName, "type": 1, "description": command.HelpDescription});
            
        } catch (error) {
            console.log(error);   
        }
    });

    rest.put(
        // change later when stopping testing
        Discord.Routes.applicationGuildCommands("", "1042613724525109368"),
        {body: f}
    )

    console.log("cmd ping register")
}

export async function AddEveryCommand() {

}

commands.set(`${Date.now()}`, new (require("./commands/ping"))["default"]);

