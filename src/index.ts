import iniparse from "./utils/ini";
import Bot from "./bot";
import { readFileSync } from "fs";
import { join } from "path";
import RegistersInteraction from "./RegisterCommands";

const options = iniparse(readFileSync(join(process.cwd(), "config.ini"), "utf-8"))

const botclient = new Bot(options);

function onstop() {
    botclient.StopBot();
}

//@ts-ignore
RegistersInteraction(options.Token);

process.addListener("SIGINT", onstop);
process.addListener("SIGTERM", onstop);

botclient.StartBot();
