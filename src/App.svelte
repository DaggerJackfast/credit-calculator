<script>
  import { onMount } from "svelte";
  import { AnnuityCalculator, DifferentialCalculator } from "./calculating.js";
  let amount = 100000;
  let percent = 10;
  let monthsCount = 6;
  let startDate = "2015-01-04";
  let payments = [];
  const annuity = new AnnuityCalculator();
  function calcucatePayments(){
    return annuity.calculate(amount, percent, monthsCount, startDate);
  }
  onMount(() => {
    payments = calcucatePayments();
  });
  function handleSubmit() {
    payments = calcucatePayments();
  }
</script>

<style>
  .form-group {
    display: inline-block;
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
  input[type="date"].form-input {
    padding: 3px 5px;
  }
  input[type="number"].form-input::-webkit-inner-spin-button,
  input[type="number"].form-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .results {
    display: block;
    width: 75%;
  }
  .payment {
    display: flex;
    padding: 5px;
    border: 1px solid;
    border-radius: 3px;
    margin-bottom: 3px;
  }
  .payment-headers{
    font-weight: bold;
  }
  .payment-cell {
    width: 15%;
  }
  .min-cell {
    width: 30px;
  }
</style>

<div>
  <h1>Credit calculator</h1>
  <div class="caclulator">
    <form
      class="form caclucalator-form"
      on:submit|preventDefault={handleSubmit}>
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
    <div class="results">
      {#if payments.length > 0}
      <h3>Payments:</h3>
        <div class="payment payment-headers">
          <span class="payment-cell min-cell">#</span>
          <span class="payment-cell">payment</span>
          <span class="payment-cell">percents</span>
          <span class="payment-cell">main debt</span>
          <span class="payment-cell">balance</span>
          <span class="payment-cell">date</span>
        </div>
        {#each payments as { monthlyPayment, loanBalance, percents, mainDebt, date }, index}
          <div class="payment">
            <span class="payment-cell min-cell">{index + 1}</span>
            <span class="payment-cell">{monthlyPayment}</span>
            <span class="payment-cell">{percents}</span>
            <span class="payment-cell">{mainDebt}</span>
            <span class="payment-cell">{loanBalance}</span>
            <span class="payment-cell">{date}</span>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
