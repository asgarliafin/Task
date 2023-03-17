export default function timing() {
    let time = new Date(), fullTime = "";
    const arr = [
        time.getDate(),
        time.getMonth(),
        time.getFullYear(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
    ];

    for (let i in arr) {
        fullTime += i < 3 ? (i < 2 ? arr[i] + "-" : arr[i] + " ") : (i != 5 ? arr[i] + ":" : arr[i])
    };
    return fullTime;
}