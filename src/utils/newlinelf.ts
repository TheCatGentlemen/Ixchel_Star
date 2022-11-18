export default function crlfTolf(str: string) {
    return str.replace(/\r\n/g, "\n");
}