import { readdirSync } from "fs";
import { join } from "path";

export default function GetCommands(): any[] {
    let array: any[] = [];
    let files = readdirSync(join(__dirname, "commands"));
    files.forEach(str => {
        str.replace(/.js/g, "");
        return true;
    });
    
    for (let i = 0; i < files.length; i++) {
        array.push(new (require(`./commands/${files[i]}`))["default"]);
    }
    return array;
}