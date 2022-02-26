<script lang="ts">
	import { portfolioStore, traderSessionStore } from '$lib/store/store';
	import { SolaceClient, SOLACE_CLIENT_CONTEXT_KEY } from '$lib/solace-client';
	import { getContext } from 'svelte';
	import { MessageDeliveryModeType } from 'solclientjs';
	import { Moon } from 'svelte-loading-spinners';
	import { DateTime } from 'luxon';

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

	let leaderboard: LeaderEntry[];

	let solaceClient: SolaceClient = getContext(SOLACE_CLIENT_CONTEXT_KEY);

	let highScoreSubmitted = false;
	let highScoreLoading = false;

	function formatTime(dateString: string): string {
		if (dateString && dateString != '') return DateTime.fromISO(dateString).toFormat('MMM dd,yyyy');
		else return '-';
	}

	function submitHighScore() {
		highScoreLoading = true;
		highScoreSubmitted = true;

		let leaderEntry: LeaderEntry = new LeaderEntry(
			$traderSessionStore.initials,
			$traderSessionStore.ip_address,
			$portfolioStore.cash,
			new Date()
		);
		solaceClient.publishToTopic(
			'tkthetechie/leader/entry/' + $traderSessionStore.initials,
			JSON.stringify(leaderEntry),
			MessageDeliveryModeType.PERSISTENT
		);

		setTimeout(() => {
			solaceClient.sendRequest(
				'tkthetechie/leaderboard/request',
				JSON.stringify(new LeaderboardRequest($traderSessionStore.initials, 10)),
				MessageDeliveryModeType.PERSISTENT,
				(msg: string) => {
					leaderboard = JSON.parse(msg);
					console.log('Received response for the leaderboard request');
					highScoreLoading = false;
				}
			);
		}, 2000);

		// 	fetch(leaderboardHost + 'get-leader-board?numberOfEntries=10')
		// 		.then((response) => re  sponse.json())
		// 		.then((ldrbrd: LeaderEntry[]) => {
		// 			leaderboard = ldrbrd;
		// 			highScoreLoading = false;
		// 		});
		// }, 2000);
	}
</script>

<section>
	{#if !highScoreSubmitted}
		<div class="flex w-full game-over-text h-full">
			<div class="text-lg justify-center items-center align-middle h-full">
				<h1 class="text-4xl text-white">CONGRATULATIONS!</h1>
				You've completed your trading session and have walked away with ${$portfolioStore.cash.toLocaleString()}.
				There is nothing left to do right now but party... or you can submit your highscore to the
				leaderboard!
				<center>
					<button
						class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full "
						on:click={submitHighScore}
					>
						SUBMIT HIGH SCORE
					</button>
				</center>
			</div>
		</div>
	{:else if highScoreLoading}
		<center>
			<Moon size="60" color="#FF3E00" unit="px" duration="2s" /> Loading Leaedrboard...
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

<style>
	.game-over-text {
		font-family: 'VT323', monospace;
	}
</style>
