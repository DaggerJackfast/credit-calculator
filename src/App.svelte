<script>
  import { AnnuityCalculator, DifferentialCalculator } from "./calculating.js";
  import Form from './Form.svelte';
  import Results from './Results.svelte';
  const calculatingArgs = {
    amount: 100000,
    percent: 10,
    monthsCount: 6,
    startDate: '2014-12-24',
    calculatorType: 'annuity'
  }
  // let amount = 0;
  // let percent = 0;
  // let monthsCount = 0;
  // let startDate = "";
  // let calculatorType = "annuity";
  let result = {
    payments: 0
  };

  const annuity = new AnnuityCalculator();
  const differential = new DifferentialCalculator();
  const calculators = {annuity, differential};
  function calcucatePayments(args) {
    const {calculatorType, amount, percent, monthsCount, startDate} = args;
    return calculators[calculatorType].calculate(amount, percent, monthsCount, startDate);
  }
  function handleSubmit(event) {
    const args = event.detail;
    result = calcucatePayments(args);
  }
</script>

<style>
  .container {
    max-width: 75%;
    margin: 0 auto;
  }
</style>

<div class="container">
  <h1>Credit calculator</h1>
  <div class="caclulator">
    <Form {...calculatingArgs} on:submit={handleSubmit}/>
    <Results {result}/>
  </div>
</div>
