export default function timing(par) {
    const time = Date.now()
    const minus = ((time - par) / ( 60 * 1000)).toFixed(0);
    return `${minus} dəq`;
}