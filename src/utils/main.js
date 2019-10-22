'use strict';

/**
 * A utility function which takes below mentioned parameters and returns left and right
 * boundry values which then will be used to find either range or list values.
 *
 * String values are compared to the config for finding their equivalent numeric values.
 *
 * Examples:
 * 1) 10-15   -> left: 10, right: 15
 * 2) SAT,WED -> left: 6, right: 3
 * 3) JAN-MAY -> left: 1, right: 5
 *
 * @param {string} char - or ,
 * @param {array} values List of splitted values by char i.e. [10-15], [JAN-MAY], [SUN-TUE], etc
 * @param {string} field Time field name i.e. minutes, day, etc
 * @param {string} config Field's configuration from config.json
 * @returns {promise/resolve} An object of left and right boundries
 * @returns {promise/reject} A string containing error message
 */
module.exports.getBoundries = (char, values, field, config) => {
    return new Promise((resolve, reject) => {
        if (values.length > 2 || !values[0] || !values[1])
            return reject(`Unsupported value, ${field} -> ${values.join(char)}`);

        let left = !isNaN(parseInt(values[0])) ? parseInt(values[0]) : null,
            right = !isNaN(parseInt(values[1])) ? parseInt(values[1]) : null;

        if (!left && config.values && config.values[values[0].toLowerCase()]) {
            left = config.values[values[0].toLowerCase()];
        }
        if (!right && config.values && config.values[values[1].toLowerCase()]) {
            right = config.values[values[1].toLowerCase()];
        }

        if (
            left === null || // cannot do !left because 0 is a valid value
            right === null || // cannot do !right because 0 is a valid value
            left < config.min ||
            left > config.max ||
            right < config.min ||
            right > config.max ||
            (char === '-' && left > right)
        )
            return reject(`Unsupported value, ${field} -> ${values.join(char)}`);

        return resolve({ left, right });
    });
};
