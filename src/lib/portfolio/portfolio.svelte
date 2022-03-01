<script lang="ts">
  import { Portfolio, portfolioStore } from '../store/store';
  import { onDestroy } from 'svelte';

  let stonks: number, cash: number;

  const unsubscribe = portfolioStore.subscribe((portfolio: Portfolio) => {
    stonks = portfolio.stonks;
    cash = portfolio.cash;
  });

  onDestroy(unsubscribe);
</script>

<section>
  <div class="w-full justify-center items-center text-center rounded-md border-2 border-green-300">
    <h1 class="m-2 text-xl font-bold tracking-tighter text-center text-white lg:text-left lg:text-xl title-font">Your Portfolio</h1>
    <div class="flex flex-col items-start w-full">
      <h2 class="ml-10 mb-1 text-s font-medium tracking-widest text-blue-100 title-font">
        Stonks: {stonks.toLocaleString()}
      </h2>
      <h2 class="ml-10 mb-1 text-s font-medium tracking-widest text-blue-100 title-font">
        Cash: <span class="ml-4">${cash.toLocaleString()}</span>
      </h2>
    </div>
  </div>
</section>
