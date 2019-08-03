<script>
  import { onMount } from "svelte";
  import { AnnuityCalculator, DifferentialCalculator } from "./calculating.js";
  let amount = 0;
  let percent = 0;
  let monthsCount = 0;
  let startDate = "";
  let calculatorType = "annuity";
  let result = {
    payments: 0
  };

  const annuity = new AnnuityCalculator();
  const differential = new DifferentialCalculator();
  const calculators = {annuity, differential};
  function calcucatePayments(type) {
    return calculators[type].calculate(amount, percent, monthsCount, startDate);
  }
  function handleSubmit() {
    result = calcucatePayments(calculatorType);
  }
</script>

<style>
  .container {
    max-width: 75%;
    margin: 0 auto;
  }
  .form-group {
    display: inline-block;
  }
  .form-group-full {
    display: block;
    width: 20%;
  }
  .input-group {
    display: flex;
    flex-direction: column;
  }
  .form-input {
    width: 100%;
    border-radius: 3px;
  }
  .form-actions {
    display: flex;
    justify-content: start;
    align-items: start;
  }
  .form-button {
    padding: 8px 14px;
    font-size: 1.1em;
    background: #9debff;
    border-radius: 3px;
    border: 1px solid #9debff;
  }
  .form-button:hover {
    background: #61ddec;
    cursor: pointer;
  }
  .form-button:active {
    background: #33d4e6;
  }
  select.form-input {
    background: transparent;
  }
  input[type="date"].form-input {
    padding: 3px 5px;
  }
  input[type="number"].form-input::-webkit-inner-spin-button,
  input[type="number"].form-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .result {
    display: block;
  }
  .payment {
    display: flex;
    padding: 5px;
    border: 1px solid;
    border-radius: 3px;
    margin-bottom: 3px;
  }
  .payment-headers {
    font-weight: bold;
  }
  .payment-total {
    font-weight: 500;
  }
  .payment-cell {
    width: 15%;
  }
  .min-cell {
    width: 30px;
  }
</style>

<div class="container">
  <h1>Credit calculator</h1>
  <div class="caclulator">
    <form
      class="form caclucalator-form"
      on:submit|preventDefault={handleSubmit}>
      <div class="form-group form-group-full ">
        <label for="calculator-type" class="form-label">Calculator type:</label>
        <select
          class="form-input"
          id="calculator-type"
          name="calculator-type"
          bind:value={calculatorType}>
          <option value="annuity">Annuity</option>
          <option value="differential">Differential</option>
        </select>
      </div>
      <div class="form-group">
        <div class="input-group">
          <label for="amount" class="form-label">Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            class="form-input"
            bind:value={amount} />
        </div>
        <div class="input-group">
          <label for="percent" class="form-label">Percent:</label>
          <input
            id="percent"
            name="percent"
            type="number"
            class="form-input"
            bind:value={percent} />
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <label for="months-count" class="form-label">Months count:</label>
          <input
            id="months-count"
            name="months-count"
            type="number"
            class="form-input"
            bind:value={monthsCount} />
        </div>
        <div class="input-group">
          <label for="start-date" class="form-label">
            Payments start date:
          </label>
          <input
            id="start-date"
            name="start-date"
            type="date"
            class="form-input"
            bind:value={startDate} />
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="form-button">calculate</button>
      </div>

    </form>
    <div class="result">
      {#if result.payments.length > 0}
        <h3>Payments:</h3>
        <div class="payment payment-headers">
          <span class="payment-cell min-cell">#</span>
          <span class="payment-cell">payment</span>
          <span class="payment-cell">percents</span>
          <span class="payment-cell">main debt</span>
          <span class="payment-cell">balance</span>
          <span class="payment-cell">date</span>
        </div>
        {#each result.payments as { monthlyPayment, loanBalance, percents, mainDebt, date }, index}
          <div class="payment">
            <span class="payment-cell min-cell">{index + 1}</span>
            <span class="payment-cell">{monthlyPayment}</span>
            <span class="payment-cell">{percents}</span>
            <span class="payment-cell">{mainDebt}</span>
            <span class="payment-cell">{loanBalance}</span>
            <span class="payment-cell">{date}</span>
          </div>
        {/each}
        <div class="payment payment-total">
          <span class="payment-cell min-cell">Σ</span>
          <span class="payment-cell">{result.totalPayment}</span>
          <span class="payment-cell">{result.totalPercents}</span>
        </div>
      {/if}
    </div>
  </div>
</div>
