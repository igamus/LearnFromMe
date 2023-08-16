export default function initials(username) {
    const names = username.split(" ");
    const capitalized = names.map(name => name.slice(0,1).toUpperCase());
    return capitalized.join("");
};
