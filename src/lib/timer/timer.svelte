<script lang="ts">
	import { gameOver } from '$lib/store/store';

	import { onMount } from 'svelte';

	export let timerStart: string;
	let minutes: number, seconds: number;
	onMount(async () => {
		minutes = parseInt(timerStart.split(':')[0]);
		seconds = parseInt(timerStart.split(':')[1]);
	});

	setInterval(() => {
		if (seconds - 1 < 0) {
			if (minutes - 1 < 0) {
				gameOver.set(true);
			} else {
				minutes -= 1;
				seconds = 59;
			}
		} else {
			seconds -= 1;
		}
	}, 1000);
</script>

<section>
	<div class="flex flex-col columns-1 w-full text-center">
		<div class="text-xs">Trading Session Timer</div>
		<h1 class="text-xl text-white">{minutes}:{seconds < 10 ? '0' + seconds : seconds}</h1>
	</div>
</section>
