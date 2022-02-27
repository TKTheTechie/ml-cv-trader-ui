<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import TradingEngine from './lib/trading-engine/trading-engine.svelte';
  import Intro from './lib/intro/intro.svelte';
  import SignalTracker from './lib/signal-tracker/signal-tracker.svelte';
  import Portfolio from './lib/portfolio/portfolio.svelte';
  import { SolaceClient, SOLACE_CLIENT_CONTEXT_KEY } from './lib/solace-client';
  import { fade } from 'svelte/transition';
  import Timer from './lib/timer/timer.svelte';
  import { gameOver } from './lib/store/store';
  import GameOver from './lib/game-over/game-over.svelte';
  import './app.css';

  let beginTrading = false;

  let solaceClient = new SolaceClient();

  setContext(SOLACE_CLIENT_CONTEXT_KEY, solaceClient);

  onMount(async () => {
    solaceClient.connect().then(() => {
      console.log('Solace Connected!!!');
    });
  });
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section class="text-gray-100 bg-black">
  <div class="grid grid-cols-2 align-top">
    <div class="flex justify-end w-full align-top text-center lg: -ml-10">
      <SignalTracker />
    </div>
    <div class="w-5/6 lg:max-w-lg ml-2 lg:w-full lg:h-full lg:max-h-lg  md:w-1/2 ">
      {#if !beginTrading}
        <Intro bind:beginTrading />
      {:else}
        <div transition:fade>
          {#if !$gameOver}
            <Timer timerStart={'2:30'} />
            <TradingEngine />
            <Portfolio />
          {:else}
            <GameOver />
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>
