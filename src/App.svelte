<script>
  import {AnnuityCalculator, DifferentialCalculator} from './calculating.js';
  let amount = 100000;
  let percent = 10;
  let monthsCount = 6;
  let startDate = '2014-12-24';
  let payments = [];
  const annuity = new AnnuityCalculator();
  function handleSubmit() {
    payments = annuity.calculate(amount, percent, monthsCount, startDate);
  }
</script>
<style>

</style>
<div>
  <h1>Credit calculator</h1>
  <div class="caclulator">
    <form class="form caclucalator-form" on:submit|preventDefault={handleSubmit}>
      <div class="input-group">
        <label for="amount" class="form-label">Amount: </label>
        <input id="amount" name="amount" type="number" class="form-input" bind:value={amount}/>
      </div>
      <div class="input-group">
        <label for="percent" class="form-label">Percent: </label>
        <input id="percent" name="percent" type="number" class="form-input" bind:value={percent}/>
      </div>
      <div class="input-group">
        <label for="months-count" class="form-label">Months count: </label>
        <input id="months-count" name="months-count" type="number" class="form-input" bind:value={monthsCount}/>
      </div>
      <div class="input-group">
        <label for="start-date" class="form-label">Payments start date: </label>
        <input id="start-date" name="start-date" type="text" class="form-input" bind:value={startDate}/>
      </div>
      <button type="submit" class="form-button">calculate</button>
    </form>
	<div class="results">
      {#each payments as {monthlyPayment, loanBalance, percents, mainDebt, date}, index}
        <div class="payment">
          <span>{index+1}</span>
          <span>{monthlyPayment}</span>
          <span>{loanBalance}</span>
          <span>{percents}</span>
          <span>{mainDebt}</span>
          <span>{date}</span>
        </div>
      {/each}
	</div>
  </div>
</div>