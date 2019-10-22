'use strict';

const { cronParser } = require('../main');

describe('Expression minimum validation check', () => {
    it('function cannot be called without an expression', async () => {
        const data = await cronParser();
        expect(data).toEqual('Unsupported expression. Exactly 5 time fields expected.');
    });

    it('cron expression has to have exactly 5 space separeted time fields ', async () => {
        const data = await cronParser('1');
        expect(data).toEqual('Unsupported expression. Exactly 5 time fields expected.');
    });
});

describe('Minutes validations checks', () => {
    it('it cannot be a non numeric value', async () => {
        const data = await cronParser('a * * * *');
        expect(data).toEqual('Unsupported value, minutes -> a');
    });

    it('it cannot be smaller than 0', async () => {
        const data = await cronParser('-1 * * * *');
        expect(data).toEqual('Unsupported value, minutes -> -1');
    });

    it('it cannot be larger than 59', async () => {
        const data = await cronParser('60 * * * *');
        expect(data).toEqual('Unsupported value, minutes -> 60');
    });

    it('valid list is between 0 to 59', async () => {
        const data = await cronParser('0,60 * * * *');
        expect(data).toEqual('Unsupported value, minutes -> 0,60');
    });

    it('valid list is between 0 to 59 with step values', async () => {
        const data = await cronParser('0,60/5 * * * *');
        expect(data).toEqual('Unsupported value, minutes -> 0,60');
    });

    it('valid range is from 0 to 59', async () => {
        const data = await cronParser('0-60 * * * *');
        expect(data).toEqual('Unsupported value, minutes -> 0-60');
    });

    it('valid range is between 0 to 59 with step values', async () => {
        const data = await cronParser('0-60/5 * * * *');
        expect(data).toEqual('Unsupported value, minutes -> 0-60');
    });

    it('range from value cannot be greater than to value', async () => {
        const data = await cronParser('40-30 * * * *');
        expect(data).toEqual('Unsupported value, minutes -> 40-30');
    });
});

describe('Hours validations checks', () => {
    it('it cannot be a non numeric value', async () => {
        const data = await cronParser('* a * * *');
        expect(data).toEqual('Unsupported value, hours -> a');
    });

    it('it cannot be smaller than 0', async () => {
        const data = await cronParser('* -1 * * *');
        expect(data).toEqual('Unsupported value, hours -> -1');
    });

    it('it cannot be larger than 23', async () => {
        const data = await cronParser('* 24 * * *');
        expect(data).toEqual('Unsupported value, hours -> 24');
    });

    it('valid list is between 0 to 23', async () => {
        const data = await cronParser('* 0,24 * * *');
        expect(data).toEqual('Unsupported value, hours -> 0,24');
    });

    it('valid list is between 0 to 23 with step values', async () => {
        const data = await cronParser('* 0,24/5 * * *');
        expect(data).toEqual('Unsupported value, hours -> 0,24');
    });

    it('valid range is from 0 to 23', async () => {
        const data = await cronParser('* 0-24 * * *');
        expect(data).toEqual('Unsupported value, hours -> 0-24');
    });

    it('valid range is between 0 to 23 with step values', async () => {
        const data = await cronParser('* 0-24/5 * * *');
        expect(data).toEqual('Unsupported value, hours -> 0-24');
    });

    it('range from value cannot be greater than to value', async () => {
        const data = await cronParser('18-12 * * * *');
        expect(data).toEqual('Unsupported value, minutes -> 18-12');
    });
});

describe('Day of month validations checks', () => {
    it('it cannot be a non numeric value', async () => {
        const data = await cronParser('* * a * *');
        expect(data).toEqual('Unsupported value, dayOfMonth -> a');
    });

    it('it cannot be smaller than 1', async () => {
        const data = await cronParser('* * 0 * *');
        expect(data).toEqual('Unsupported value, dayOfMonth -> 0');
    });

    it('it cannot be larger than 31', async () => {
        const data = await cronParser('* * 32 * *');
        expect(data).toEqual('Unsupported value, dayOfMonth -> 32');
    });

    it('valid list is between 1 to 31', async () => {
        const data = await cronParser('* * 1,32 * *');
        expect(data).toEqual('Unsupported value, dayOfMonth -> 1,32');
    });

    it('valid list is between 1 to 31 with step values', async () => {
        const data = await cronParser('* * 1,32/5 * *');
        expect(data).toEqual('Unsupported value, dayOfMonth -> 1,32');
    });

    it('valid range is from 1 to 31', async () => {
        const data = await cronParser('* * 0-32 * *');
        expect(data).toEqual('Unsupported value, dayOfMonth -> 0-32');
    });

    it('valid range is between 1 to 31 with step values', async () => {
        const data = await cronParser('* * 0-32/5 * *');
        expect(data).toEqual('Unsupported value, dayOfMonth -> 0-32');
    });

    it('range from value cannot be greater than to value', async () => {
        const data = await cronParser('* * 20-10 * *');
        expect(data).toEqual('Unsupported value, dayOfMonth -> 20-10');
    });
});

describe('Month validations checks', () => {
    it('it cannot be smaller than 1', async () => {
        const data = await cronParser('* * * 0 *');
        expect(data).toEqual('Unsupported value, month -> 0');
    });

    it('it cannot be larger than 12', async () => {
        const data = await cronParser('* * * 13 *');
        expect(data).toEqual('Unsupported value, month -> 13');
    });

    it('valid list is between 1 to 12', async () => {
        const data = await cronParser('* * * 1,13 *');
        expect(data).toEqual('Unsupported value, month -> 1,13');
    });

    it('valid list is between 1 to 12 with step values', async () => {
        const data = await cronParser('* * * 1,13/5 *');
        expect(data).toEqual('Unsupported value, month -> 1,13');
    });

    it('valid range is from 1 to 12', async () => {
        const data = await cronParser('* * * 0-13 *');
        expect(data).toEqual('Unsupported value, month -> 0-13');
    });

    it('valid range is between 1 to 12 with step values', async () => {
        const data = await cronParser('* * * 0-13/5 *');
        expect(data).toEqual('Unsupported value, month -> 0-13');
    });

    it('range from value cannot be greater than to value', async () => {
        const data = await cronParser('* * * 10-8 *');
        expect(data).toEqual('Unsupported value, month -> 10-8');
    });

    it('only non numeric values alowed are from JAN to DEC', async () => {
        const data = await cronParser('* * * a *');
        expect(data).toEqual('Unsupported value, month -> a');
    });
});

describe('Day of week validations checks', () => {
    it('it cannot be smaller than 0', async () => {
        const data = await cronParser('* * * * -1');
        expect(data).toEqual('Unsupported value, dayOfWeek -> -1');
    });

    it('it cannot be larger than 6', async () => {
        const data = await cronParser('* * * * 7');
        expect(data).toEqual('Unsupported value, dayOfWeek -> 7');
    });

    it('valid list is between 0 to 6', async () => {
        const data = await cronParser('* * * * 0,7');
        expect(data).toEqual('Unsupported value, dayOfWeek -> 0,7');
    });

    it('valid list is between 0 to 6 with step values', async () => {
        const data = await cronParser('* * * * 0,7/5');
        expect(data).toEqual('Unsupported value, dayOfWeek -> 0,7');
    });

    it('valid range is from 0 to 6', async () => {
        const data = await cronParser('* * * * 0-7');
        expect(data).toEqual('Unsupported value, dayOfWeek -> 0-7');
    });

    it('valid range is between 0 to 6 with step values', async () => {
        const data = await cronParser('* * * * 0-7/5');
        expect(data).toEqual('Unsupported value, dayOfWeek -> 0-7');
    });

    it('range from value cannot be greater than to value', async () => {
        const data = await cronParser('* * * * 5-2');
        expect(data).toEqual('Unsupported value, dayOfWeek -> 5-2');
    });

    it('only non numeric values alowed are from SUN to SAT', async () => {
        const data = await cronParser('* * * * a');
        expect(data).toEqual('Unsupported value, dayOfWeek -> a');
    });
});

describe('Success output checks', () => {
    it('30 10-13 ? * WED,FRI', async () => {
        const data = await cronParser('30 10-13 ? * WED,FRI');
        expect(data).toEqual(`minute        30
hour          10 11 12 13
day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   3 5`);
    });
});
