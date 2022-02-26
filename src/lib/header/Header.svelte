<script lang="ts">
	import Icon from 'svelte-awesome';
	import { github } from 'svelte-awesome/icons';
</script>

<header>
	<section class="relative w-full px-8 text-gray-700 dark:bg-slate-900 bg-white body-font">
		<div
			class="container flex flex-col flex-wrap items-center justify-between py-3 mx-auto md:flex-row max-w-7xl"
		>
			<span
				class="relative header-text z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-green-500 select-none"
				>cv-ml-trader</span
			>

			<nav
				class="top-0 left-0 z-0 flex items-center justify-center w-full h-full py-5 -ml-0 space-x-5 text-base md:-ml-5 md:py-0 md:absolute"
			>
				<a
					href="https://github.com/TKTheTechie/cv-ml-trader-ui"
					class="relative text-lg leading-6 dark:text-white transition duration-150 ease-out hover:text-slate-500"
					target="_blank"
				>
					<Icon data={github} scale={2} />
				</a>
			</nav>
		</div>
	</section>
</header>

<style>
	.header-text {
		font-family: Arial;
	}
</style>
