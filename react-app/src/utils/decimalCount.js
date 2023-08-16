export default function decimalCount(n) {
    const arr = n.toString().split(".");
    if (arr.length === 1) return 0;
    if (arr.length === 2) return arr[1].length
    return NaN;
};
