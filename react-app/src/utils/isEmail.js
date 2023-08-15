export default function isEmail(str) {
    const searchAt = str.split("@");
    if (searchAt.length !== 2) return false;
    const searchPeriod = searchAt[1].split(".");
    if (searchPeriod.length !== 2) return false;

    return true;
};
