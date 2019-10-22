'use strict';

const { createInterface } = require('readline');
const { cronParser } = require('./src/main');

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function question() {
    return new Promise((resolve, reject) => {
        rl.question('Cron expression? ', answer => {
            resolve(answer);
        });
    });
}

const main = async () => {
    const expression = await question();
    rl.close();

    console.log(await cronParser(expression.trim()));
};

main();
