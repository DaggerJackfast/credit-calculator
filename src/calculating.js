export class Calculator {
    constructor() {}
    addMonths(stringDate, addedMonthsCount) {
        const date = new Date(stringDate);
        const addedYears = Math.floor(addedMonthsCount / 12);
        const addedMonths = addedMonthsCount - (addedYears * 12);
        if (addedYears) date.setFullYear(date.getFullYear() + addedYears);
        if (addedMonths) date.setMonth(date.getMonth() + addedMonths);
        const year = date.getFullYear();
        const month = this.padWithZeroes(date.getMonth() + 1, 2);
        const day = this.padWithZeroes(date.getDate(), 2);
        const formatedDate = `${year}-${month}-${day}`;
        return formatedDate;
    }
    padWithZeroes(number, length) {
        let string = '' + number;
        while (string.length < length) {
            string = '0' + string;
        }
        return string;
    }
    numberRound(value, places) {
        return +(Math.round(value + "e+" + places) + "e-" + places)
    }
    getMonthsDaysCount(stringDate) {
        const date = new Date(stringDate);
        const monthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const daysCount = monthDate.getDate();
        return daysCount;
    }
    getYearsDaysCount(stringDate) {
        const date = new Date(stringDate);
        const year = date.getFullYear();
        const daysCount = this.isLeapYear(year) ? 366 : 365
        return daysCount;
    }
    isLeapYear(year) {
        return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    }
}

export class AnnuityCalculator extends Calculator {
    constructor() {
        return super();
    }
    calculate(amount, percent, monthsCount, startDate) {
        const payments = [];
        const percentDecimal = percent / 100;
        const percentPerMonth = percentDecimal / 12;
        const monthlyPayment = amount * (percentPerMonth + (percentPerMonth / (Math.pow((1 + percentPerMonth), monthsCount) - 1)));
        let loanBalance = amount;
        let mainDebt = 0;
        for (const index of Array(monthsCount).keys()) {
            loanBalance = loanBalance - mainDebt;
            const percents = loanBalance * percentPerMonth;
            mainDebt = monthlyPayment - percents;
            const addedMonthsCount = index + 1;
            const date = this.addMonths(startDate, addedMonthsCount);
            payments.push({
                monthlyPayment: this.numberRound(monthlyPayment, 2),
                loanBalance: this.numberRound(loanBalance, 2),
                percents: this.numberRound(percents, 2),
                mainDebt: this.numberRound(mainDebt, 2),
                date,
            });
        }
        return payments;
    }
}

export class DifferentialCalculator extends Calculator {
    constructor() {
        return super();
    }
    calculate(amount, percent, monthsCount, startDate) {
        const payments = [];
        const mainDebt = amount / monthsCount;
        const percentDecimal = percent / 100;
        for (const index of Array(monthsCount).keys()) {
            const addedMonths = index + 1;
            const date = this.addMonths(startDate, addedMonths);
            const monthsDaysCount = this.getMonthsDaysCount(date);
            const yearsDaysCount = this.getYearsDaysCount(date);
            const loanBalance = amount - mainDebt * index;
            const percents = loanBalance * percentDecimal * monthsDaysCount / yearsDaysCount;
            const monthlyPayment = mainDebt + percents;
            payments.push({
                monthlyPayment: this.numberRound(monthlyPayment, 2),
                loanBalance: this.numberRound(loanBalance, 2),
                percents: this.numberRound(percents, 2),
                mainDebt: this.numberRound(mainDebt, 2),
                date,
            })
        }
        return payments;
    }
    
}