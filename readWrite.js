const fs = require('fs');
let reverseData = "";

fs.readFile('/a.txt', (err, data) => {
    if (err !== null) {
        console.log("An error has occurred while reading the file: " + err.name + ": " + err.message);
        return;
    }
    reverseData = reverseString(data);
});

fs.writeFile('/b.txt', reverseData, (err) => {
    if (err) {
        console.log("An error has occurred while writing the file: " + err.name + ": " + err.message);
    }
});

function reverseString(str) {
    return str.split("").reverse().join("");
}