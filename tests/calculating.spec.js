import { assert } from 'chai';
import {AnnuityCalculator} from '../src/calculating.js'
import {readJsonFixture} from './test_utils.js';
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('AnnuityCalculator', function(){
    it('should return pays for full period', function(){
        const amount = 100000;
        const percent = 10;
        const monthCount = 6;
        const startDate = new Date('2015-01-24');
        const calucaltor = new AnnuityCalculator();
        const payments = calucaltor.calculate(amount, percent, monthCount, startDate);
        const expected = readJsonFixture('payments.json');
        assert.deepEqual(payments, expected);
    })
});