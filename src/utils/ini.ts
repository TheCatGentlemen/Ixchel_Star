import anticrlf from "./newlinelf";

export default function initojson(udata: string) {
    let f: object = {};

    let data: string = anticrlf(udata);
    let lines: string[] = data.split("\n");
    let i = 0;
    let j = 0;
    
    while (lines[i] != undefined) {
        while (lines[i][j]) {
            if (lines[i][j] === ";") {
                lines[i] = lines[i].slice(0, j - 1);
                break;
            }
            j++;
        }

        let equalindex = lines[i].indexOf("=");
        if (equalindex !== -1) {
            // @ts-ignore
            f[lines[i].slice(0, equalindex)] = lines[i].slice(equalindex + 1, lines[i].length);
        }

        j = 0;
        i++;
    }

    return f;
}