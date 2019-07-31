import {
    assert
} from 'chai';
import {
    AnnuityCalculator,
    DifferentialCalculator,
    Calculator
} from '../src/calculating.js'
import {
    readJsonFixture
} from './test_utils.js';
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('AnnuityCalculator', function () {
    it('should return pays for full period', function () {
        const amount = 100000;
        const percent = 10;
        const monthsCount = 6;
        const startDate = '2014-12-24';
        const calucaltor = new AnnuityCalculator();
        const payments = calucaltor.calculate(amount, percent, monthsCount, startDate);
        const expected = readJsonFixture('annuityPayments.json');
        assert.deepEqual(payments, expected);
    })
});
describe('DifferentialCalculator', function () {
    it('should return pays for full period', function () {
        const amount = 300000;
        const percent = 20;
        const monthsCount = 6;
        const startDate = '2015-06-04';
        const calucaltor = new DifferentialCalculator();
        const payments = calucaltor.calculate(amount, percent, monthsCount, startDate);
        const expected = readJsonFixture('differentialPayments.json');
        assert.deepEqual(payments, expected);
    })
});
describe('Calculator', function () {
    it('should return date', function () {
        const calculator = new Calculator();
        assert.equal(calculator.addMonths('2015-06-04', 6), '2015-12-04');
    })
});