<script lang="ts">
  import { SolaceClient, SOLACE_CLIENT_CONTEXT_KEY } from '../solace-client';
  import { getContext, onMount } from 'svelte';
  import solace from 'solclientjs';
  import { Moon } from 'svelte-loading-spinners';
  import { traderSessionStore } from '../store/store';
  import { DateTime } from 'luxon';

  let leaderboard: LeaderEntry[];

  export let numberOfEntries = 10;

  let solaceClient: SolaceClient = getContext(SOLACE_CLIENT_CONTEXT_KEY);

  let highScoreLoading = true;

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

  class LeaderboardRequest {
    initials: string;
    numberOfEntries: number;

    constructor(initials: string, numberOfEntries: number) {
      this.initials = initials;
      this.numberOfEntries = numberOfEntries;
    }
  }

  function formatTime(dateString: string): string {
    if (dateString && dateString != '') return DateTime.fromISO(dateString).toFormat('MMM dd,yyyy');
    else return '-';
  }

  onMount(async () => {
    highScoreLoading = true;

    setTimeout(() => {
      solaceClient.sendRequest(
        'tkthetechie/leaderboard/request',
        JSON.stringify(new LeaderboardRequest($traderSessionStore.initials, numberOfEntries)),
        solace.MessageDeliveryModeType.PERSISTENT,
        (msg: string) => {
          leaderboard = JSON.parse(msg);
          console.log('Received response for the leaderboard request');
          highScoreLoading = false;
        }
      );
    }, 2000);
  });
</script>

<section>
  {#if highScoreLoading}
    <center>
      <Moon size="60" color="#FF3E00" unit="px" duration="2s" /> Loading Leaderboard...
    </center>
  {:else}
    <div class="grid grid-cols-4 w-full text-center">
      <div class="col-span-4"><h1 class="text-3xl text-white">LEADERBOARD</h1></div>
      <div>Position</div>
      <div>Initials</div>
      <div>Score</div>
      <div>Time</div>

      {#each leaderboard as { initials, score, timestamp }, i}
        <div>{i + 1}</div>
        <div>{initials}</div>
        <div>${score.toLocaleString()}</div>
        <div>{formatTime(timestamp)}</div>
      {/each}
    </div>
  {/if}
</section>
