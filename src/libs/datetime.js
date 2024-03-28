export function dbReadableTime(str) {
    return str.replace('T', ' ').substring(0, 16);
}