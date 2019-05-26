const fs = require('fs');
const args = process.argv;
let readFile = args[2];
let writeFile = args[3];
let content = "";
let reversedData = "";

const readReverse = (path) =>
    new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject (err);
            resolve(data);
        });
    });

async function readReverseWrite (){
    try {
        content = await readReverse(`./${readFile}`);
    } catch (err) {
        console.log("An error has occurred while reading/processing the file: " + err.name + ": " + err.message);
    }
    reversedData = reverseString(content.toString());
    try {
        fs.writeFile(`./${writeFile}`, reversedData, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("Successfully wrote the file");
            }
        });
    } catch (err) {
        console.log("An error has occurred while writing: " + err.name + ": " + err.message);
    }
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

readReverseWrite();