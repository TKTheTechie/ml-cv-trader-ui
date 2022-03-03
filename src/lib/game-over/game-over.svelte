<script lang="ts">
  import { portfolioStore, traderSessionStore } from '../store/store';
  import { SolaceClient, SOLACE_CLIENT_CONTEXT_KEY } from '../solace-client';
  import { getContext, onMount } from 'svelte';
  import Leaderboard from '../leaderboard/leaderboard.svelte';
  import solace from 'solclientjs';

  let solaceClient: SolaceClient = getContext(SOLACE_CLIENT_CONTEXT_KEY);

  let showLeaderboard = false;

  class LeaderEntry {
    initials: string;
    ip_address: string;
    score: number;
    timestamp: string;

    constructor(initials: string, ip_address: string, score: number, timestamp: Date) {
      this.initials = initials;
      this.ip_address = ip_address;
      this.score = score;
      this.timestamp = timestamp.toISOString();
    }
  }

  onMount(async () => {
    //submit high score on load
    setTimeout(() => {
      let leaderEntry: LeaderEntry = new LeaderEntry($traderSessionStore.initials, $traderSessionStore.ip_address, $portfolioStore.cash, new Date());
      solaceClient.publishToTopic('tkthetechie/leader/entry/' + $traderSessionStore.initials, JSON.stringify(leaderEntry), solace.MessageDeliveryModeType.PERSISTENT);
    }, 2000);
  });
</script>

<section>
  <div class="flex w-full game-over-text h-full">
    <div class="text-lg justify-center items-center align-middle h-full">
      <h1 class="text-4xl text-white">CONGRATULATIONS!</h1>
      You've completed your trading session and have walked away with ${$portfolioStore.cash.toLocaleString()}. There is nothing left to do right now but party!

      <Leaderboard numberOfEntries={10} />
    </div>
  </div>
</section>
