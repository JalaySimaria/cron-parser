'use strict';

const { getBoundries } = require('./utils/main');
const config = require('./config.json');

/**
 * Main function to be called which parses the cron expression.
 * Which will then process the expression and expands each field to show the times at which it will run.
 *
 * Format: minute hour day-of-month month day-of-week
 *
 * Features covered are:
 * 1) Asterisk ( * )
 * 2) Comma ( , )
 * 3) Hyphen ( - )
 * 4) Slash ( / )
 * 5) Question mark ( ? )
 *
 * @param {string} expression Cron expression needs to be parsed
 * @returns {string} Output formatted as a table with the field name taking the first 14 columns and the times as a space-separated list
 */
module.exports.cronParser = async (expression = '') => {
	/*
	Step-1: '1-10/5 10-13 ? * WED,FRI' becomes ['1-10/5', '10-13', '?', '*', 'WED,FRI']
	*/
    expression = expression.split(' ');

    if (expression.length !== 5) return 'Unsupported expression. Exactly 5 time fields expected.';
    else if (expression[2] === '?' && expression[4] === '?')
        return 'Both dayOfMonth and dayOfWeek cannot be "?"';

    const configKeys = Object.keys(config),
        result = {
            minutes: [],
            hours: [],
            dayOfMonth: [],
            month: [],
            dayOfWeek: []
        };

    for (let i = 0; i < 5; i++) {
		/*
		Step-2: '1-10/5' becomes ['1-10', '5']
		*/
        expression[i] = expression[i].split('/');

        if (expression[i][0] === '*' || expression[i][0] === '?') {
            for (
                let j = config[configKeys[i]].min;
                j <= config[configKeys[i]].max;
                j += +expression[i][1] || 1 // incrementing by steps value if available
            ) {
                result[configKeys[i]].push(j);
            }
        } else if (expression[i][0].indexOf(',') !== -1) {
            try {
                const { left, right } = await getBoundries(
                    ',',
                    expression[i][0].split(','),
                    configKeys[i],
                    config[configKeys[i]]
                );

                result[configKeys[i]].push(left);
                result[configKeys[i]].push(right);
            } catch (err) {
                return err;
            }
        } else if (expression[i][0].indexOf('-') !== -1) {
            try {
                const { left, right } = await getBoundries(
                    '-',
                    expression[i][0].split('-'),
                    configKeys[i],
                    config[configKeys[i]]
                );

                for (let j = left; j <= right; j++) {
                    result[configKeys[i]].push(j);
                }
            } catch (err) {
                return err;
            }
        } else {
            let value = !isNaN(parseInt(expression[i][0])) ? parseInt(expression[i][0]) : null;

            if (
                !value &&
                config[configKeys[i]].values &&
                config[configKeys[i]].values[expression[i][0].toLowerCase()]
            )
                value = config[configKeys[i]].values[expression[i][0].toLowerCase()];

            if (
                value === null || // cannot do !value because 0 is a valid value
                value < config[configKeys[i]].min ||
                value > config[configKeys[i]].max
            )
                return `Unsupported value, ${configKeys[i]} -> ${expression[i][0]}`;

            result[configKeys[i]].push(value);
            if (expression[i][1]) result[configKeys[i]].push(value + +expression[i][1]); // adding steps value  if available
        }
    }

    return `minute        ${result.minutes.join(' ')}
hour          ${result.hours.join(' ')}
day of month  ${result.dayOfMonth.join(' ')}
month         ${result.month.join(' ')}
day of week   ${result.dayOfWeek.join(' ')}`;
};
