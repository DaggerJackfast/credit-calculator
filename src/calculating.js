export class AnnuityCalculator {
    constructor() {}
    calculate(amount, percent, monthCount, startDate) {
        const payments = [];
        const percentDecimal = percent / 100;
        const percentPerMonth = percentDecimal / 12;
        const monthlyPayment = amount * (percentPerMonth + (percentPerMonth / (Math.pow((1 + percentPerMonth), monthCount) - 1)));
        let loanBalance = amount;
        let mainDebt = 0;
        for (const index of Array(monthCount).keys()) {
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
    addMonths(stringDate, addedMonthsCount) {
        const date = new Date(stringDate);
        const addedYears = Math.floor(addedMonthsCount / 12);
        const addedMonths = addedMonthsCount - (addedYears * 12);
        if (addedYears) date.setFullYear(date.getFullYear() + addedYears);
        if (addedMonths) date.setMonth(date.getMonth() + addedMonths);
        const year = date.getFullYear();
        const month = this.padWithZeroes(date.getMonth(), 2);
        const day = date.getDate();
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
}