<script>
    export let result = []
</script>
<style>
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
