/* src/App.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	add_flush_callback,
	add_render_callback,
	append,
	attr,
	bind,
	binding_callbacks,
	check_outros,
	component_subscribe,
	create_bidirectional_transition,
	create_component,
	destroy_component,
	detach,
	element,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "../_snowpack/pkg/svelte/internal.js";

import { onMount, setContext } from '../_snowpack/pkg/svelte.js';
import TradingEngine from './lib/trading-engine/trading-engine.svelte.js';
import Intro from './lib/intro/intro.svelte.js';
import SignalTracker from './lib/signal-tracker/signal-tracker.svelte.js';
import Portfolio from './lib/portfolio/portfolio.svelte.js';
import { SolaceClient, SOLACE_CLIENT_CONTEXT_KEY } from './lib/solace-client.js';
import { fade } from '../_snowpack/pkg/svelte/transition.js';
import Timer from './lib/timer/timer.svelte.js';
import { gameOver } from './lib/store/store.js';
import GameOver from './lib/game-over/game-over.svelte.js';
import './app.css.proxy.js';

function create_else_block(ctx) {
	let div;
	let timer;
	let t;
	let current_block_type_index;
	let if_block;
	let div_transition;
	let current;
	timer = new Timer({ props: { timerStart: '2:30' } });
	const if_block_creators = [create_if_block_1, create_else_block_1];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (!/*$gameOver*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div = element("div");
			create_component(timer.$$.fragment);
			t = space();
			if_block.c();
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(timer, div, null);
			append(div, t);
			if_blocks[current_block_type_index].m(div, null);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx, dirty);

			if (current_block_type_index !== previous_block_index) {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					
				}

				transition_in(if_block, 1);
				if_block.m(div, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(timer.$$.fragment, local);
			transition_in(if_block);

			add_render_callback(() => {
				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {}, true);
				div_transition.run(1);
			});

			current = true;
		},
		o(local) {
			transition_out(timer.$$.fragment, local);
			transition_out(if_block);
			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, {}, false);
			div_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(timer);
			if_blocks[current_block_type_index].d();
			if (detaching && div_transition) div_transition.end();
		}
	};
}

// (32:6) {#if !beginTrading}
function create_if_block(ctx) {
	let intro;
	let updating_beginTrading;
	let current;

	function intro_beginTrading_binding(value) {
		/*intro_beginTrading_binding*/ ctx[2](value);
	}

	let intro_props = {};

	if (/*beginTrading*/ ctx[0] !== void 0) {
		intro_props.beginTrading = /*beginTrading*/ ctx[0];
	}

	intro = new Intro({ props: intro_props });
	binding_callbacks.push(() => bind(intro, 'beginTrading', intro_beginTrading_binding));

	return {
		c() {
			create_component(intro.$$.fragment);
		},
		m(target, anchor) {
			mount_component(intro, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const intro_changes = {};

			if (!updating_beginTrading && dirty & /*beginTrading*/ 1) {
				updating_beginTrading = true;
				intro_changes.beginTrading = /*beginTrading*/ ctx[0];
				add_flush_callback(() => updating_beginTrading = false);
			}

			intro.$set(intro_changes);
		},
		i(local) {
			if (current) return;
			transition_in(intro.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(intro.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(intro, detaching);
		}
	};
}

// (40:10) {:else}
function create_else_block_1(ctx) {
	let gameover;
	let current;
	gameover = new GameOver({});

	return {
		c() {
			create_component(gameover.$$.fragment);
		},
		m(target, anchor) {
			mount_component(gameover, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(gameover.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(gameover.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(gameover, detaching);
		}
	};
}

// (37:10) {#if !$gameOver}
function create_if_block_1(ctx) {
	let tradingengine;
	let t;
	let portfolio;
	let current;
	tradingengine = new TradingEngine({});
	portfolio = new Portfolio({});

	return {
		c() {
			create_component(tradingengine.$$.fragment);
			t = space();
			create_component(portfolio.$$.fragment);
		},
		m(target, anchor) {
			mount_component(tradingengine, target, anchor);
			insert(target, t, anchor);
			mount_component(portfolio, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(tradingengine.$$.fragment, local);
			transition_in(portfolio.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(tradingengine.$$.fragment, local);
			transition_out(portfolio.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(tradingengine, detaching);
			if (detaching) detach(t);
			destroy_component(portfolio, detaching);
		}
	};
}

function create_fragment(ctx) {
	let t0;
	let section;
	let div2;
	let div0;
	let signaltracker;
	let t1;
	let div1;
	let current_block_type_index;
	let if_block;
	let current;
	signaltracker = new SignalTracker({});
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*beginTrading*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			t0 = space();
			section = element("section");
			div2 = element("div");
			div0 = element("div");
			create_component(signaltracker.$$.fragment);
			t1 = space();
			div1 = element("div");
			if_block.c();
			document.title = "Home";
			attr(div0, "class", "flex justify-end w-full align-top text-center lg: -ml-10");
			attr(div1, "class", "w-5/6 lg:max-w-lg ml-2 lg:w-full lg:h-full lg:max-h-lg md:w-1/2 ");
			attr(div2, "class", "grid grid-cols-2 align-top");
			attr(section, "class", "text-gray-100 bg-black");
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, section, anchor);
			append(section, div2);
			append(div2, div0);
			mount_component(signaltracker, div0, null);
			append(div2, t1);
			append(div2, div1);
			if_blocks[current_block_type_index].m(div1, null);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div1, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(signaltracker.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(signaltracker.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(t0);
			if (detaching) detach(section);
			destroy_component(signaltracker);
			if_blocks[current_block_type_index].d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $gameOver;
	component_subscribe($$self, gameOver, $$value => $$invalidate(1, $gameOver = $$value));
	let beginTrading = false;
	let solaceClient = new SolaceClient();
	setContext(SOLACE_CLIENT_CONTEXT_KEY, solaceClient);

	onMount(async () => {
		solaceClient.connect().then(() => {
			console.log('Solace Connected!!!');
		});
	});

	function intro_beginTrading_binding(value) {
		beginTrading = value;
		$$invalidate(0, beginTrading);
	}

	return [beginTrading, $gameOver, intro_beginTrading_binding];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default App;