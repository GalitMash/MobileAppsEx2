const fs = require('fs');
let reverseData = "";

try {
    fs.readFile('/a.txt', (err, data) => {
        if (err) throw err;
        reverseData = reverseString(data);
    });
    fs.writeFile('/b.txt', reverseData, (err) => {
        if (err) throw err;
    });
} catch (err) {
    console.log("An error has occurred while reading/writing: " + err.name + ": " + err.message);
}

function reverseString(str) {
    return str.split("").reverse().join("");
}