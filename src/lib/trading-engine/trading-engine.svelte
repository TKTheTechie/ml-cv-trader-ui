<script lang="ts">
	import Chart from 'svelte-frappe-charts';
	import { SolaceClient, SOLACE_CLIENT_CONTEXT_KEY } from '$lib/solace-client';
	import { getContext, onMount } from 'svelte';
	import type { Message } from 'solclientjs';
	import {
		MarketDataEvent,
		tickStore,
		signalStore,
		gameOver,
		Signal,
		portfolioStore
	} from '$lib/store/store';

	let lineOptions = { hideDots: 1 };
	let axisOptions = { xAxisMode: 'tick' };

	let solaceClient: SolaceClient = getContext(SOLACE_CLIENT_CONTEXT_KEY);

	let solaceChart;

	let data = {
		labels: [],
		datasets: [
			{
				values: []
			}
		]
	};
	onMount(async () => {
		solaceClient.subscribe('tkthetechie/price/solly', (msg: Message) => {
			const blob = new Blob([msg.getBinaryAttachment()], { type: 'text/plain; charset=utf-8' });
			blob.text().then((text) => {
				let marketDataEvent: MarketDataEvent = JSON.parse(text);
				tickStore.updateTick(marketDataEvent);
				solaceChart.addDataPoint('', [marketDataEvent.mid]);
			});

			if ($gameOver) {
				console.log('Game over - emptying portfolio at ' + $tickStore.mid);
				solaceClient.unsubscribe('tkthetechie/price/solly');
				if ($portfolioStore.stonks != 0)
					portfolioStore.sellStonks($portfolioStore.stonks, $tickStore.ask);
			} else {
				switch ($signalStore) {
					case Signal.BUY:
						portfolioStore.buyStonks(1, $tickStore.bid);
						break;
					case Signal.SELL:
						portfolioStore.sellStonks(1, $tickStore.ask);
						break;
					default:
						break;
				}
			}
		});
	});
</script>

<section>
	<Chart
		{data}
		type="line"
		bind:this={solaceChart}
		class="w-full h-full"
		{lineOptions}
		{axisOptions}
	/>
</section>
