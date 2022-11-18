import iniparse from "./utils/ini";
import Bot from "./bot";
import { readFileSync } from "fs";
import { join } from "path";

const options = iniparse(readFileSync(join(process.cwd(), "config.ini"), "utf-8"))

const botclient = new Bot(options);
botclient.StartBot();