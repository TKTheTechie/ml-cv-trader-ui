/* src/lib/leaderboard/leaderboard.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	group_outros,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	set_data,
	space,
	text,
	transition_in,
	transition_out
} from "../../../_snowpack/pkg/svelte/internal.js";

import { SOLACE_CLIENT_CONTEXT_KEY } from '../solace-client.js';
import { getContext, onMount } from '../../../_snowpack/pkg/svelte.js';
import solace from '../../../_snowpack/pkg/solclientjs.js';
import { Moon } from '../../../_snowpack/pkg/svelte-loading-spinners.js';
import { traderSessionStore } from '../store/store.js';
import { DateTime } from '../../../_snowpack/pkg/luxon.js';

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i].initials;
	child_ctx[9] = list[i].score;
	child_ctx[10] = list[i].timestamp;
	child_ctx[12] = i;
	return child_ctx;
}

// (84:2) {:else}
function create_else_block(ctx) {
	let div5;
	let div0;
	let t1;
	let div1;
	let t3;
	let div2;
	let t5;
	let div3;
	let t7;
	let div4;
	let t9;
	let each_value = /*leaderboard*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div5 = element("div");
			div0 = element("div");
			div0.innerHTML = `<h1 class="text-3xl text-white">LEADERBOARD</h1>`;
			t1 = space();
			div1 = element("div");
			div1.textContent = "Position";
			t3 = space();
			div2 = element("div");
			div2.textContent = "Initials";
			t5 = space();
			div3 = element("div");
			div3.textContent = "Score";
			t7 = space();
			div4 = element("div");
			div4.textContent = "Time";
			t9 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", "col-span-4");
			attr(div5, "class", "grid grid-cols-4 w-full text-center");
		},
		m(target, anchor) {
			insert(target, div5, anchor);
			append(div5, div0);
			append(div5, t1);
			append(div5, div1);
			append(div5, t3);
			append(div5, div2);
			append(div5, t5);
			append(div5, div3);
			append(div5, t7);
			append(div5, div4);
			append(div5, t9);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div5, null);
			}
		},
		p(ctx, dirty) {
			if (dirty & /*formatTime, leaderboard*/ 5) {
				each_value = /*leaderboard*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div5, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div5);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (80:2) {#if highScoreLoading}
function create_if_block(ctx) {
	let center;
	let moon;
	let t;
	let current;

	moon = new Moon({
			props: {
				size: "60",
				color: "#FF3E00",
				unit: "px",
				duration: "2s"
			}
		});

	return {
		c() {
			center = element("center");
			create_component(moon.$$.fragment);
			t = text(" Loading Leaderboard...");
		},
		m(target, anchor) {
			insert(target, center, anchor);
			mount_component(moon, center, null);
			append(center, t);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(moon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(moon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(center);
			destroy_component(moon);
		}
	};
}

// (92:6) {#each leaderboard as { initials, score, timestamp }
function create_each_block(ctx) {
	let div0;
	let t0_value = /*i*/ ctx[12] + 1 + "";
	let t0;
	let t1;
	let div1;
	let t2_value = /*initials*/ ctx[8] + "";
	let t2;
	let t3;
	let div2;
	let t4;
	let t5_value = /*score*/ ctx[9].toLocaleString() + "";
	let t5;
	let t6;
	let div3;
	let t7_value = /*formatTime*/ ctx[2](/*timestamp*/ ctx[10]) + "";
	let t7;

	return {
		c() {
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			div1 = element("div");
			t2 = text(t2_value);
			t3 = space();
			div2 = element("div");
			t4 = text("$");
			t5 = text(t5_value);
			t6 = space();
			div3 = element("div");
			t7 = text(t7_value);
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			append(div0, t0);
			insert(target, t1, anchor);
			insert(target, div1, anchor);
			append(div1, t2);
			insert(target, t3, anchor);
			insert(target, div2, anchor);
			append(div2, t4);
			append(div2, t5);
			insert(target, t6, anchor);
			insert(target, div3, anchor);
			append(div3, t7);
		},
		p(ctx, dirty) {
			if (dirty & /*leaderboard*/ 1 && t2_value !== (t2_value = /*initials*/ ctx[8] + "")) set_data(t2, t2_value);
			if (dirty & /*leaderboard*/ 1 && t5_value !== (t5_value = /*score*/ ctx[9].toLocaleString() + "")) set_data(t5, t5_value);
			if (dirty & /*leaderboard*/ 1 && t7_value !== (t7_value = /*formatTime*/ ctx[2](/*timestamp*/ ctx[10]) + "")) set_data(t7, t7_value);
		},
		d(detaching) {
			if (detaching) detach(div0);
			if (detaching) detach(t1);
			if (detaching) detach(div1);
			if (detaching) detach(t3);
			if (detaching) detach(div2);
			if (detaching) detach(t6);
			if (detaching) detach(div3);
		}
	};
}

function create_fragment(ctx) {
	let section;
	let current_block_type_index;
	let if_block;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*highScoreLoading*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			section = element("section");
			if_block.c();
		},
		m(target, anchor) {
			insert(target, section, anchor);
			if_blocks[current_block_type_index].m(section, null);
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
				if_block.m(section, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			if_blocks[current_block_type_index].d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $traderSessionStore;
	component_subscribe($$self, traderSessionStore, $$value => $$invalidate(4, $traderSessionStore = $$value));
	let leaderboard;
	let { numberOfEntries = 10 } = $$props;
	let solaceClient = getContext(SOLACE_CLIENT_CONTEXT_KEY);
	let highScoreLoading = true;

	class LeaderEntry {
		constructor(initials, ip_address, score, timestamp) {
			Object.defineProperty(this, "initials", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});

			Object.defineProperty(this, "ip_address", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});

			Object.defineProperty(this, "score", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});

			Object.defineProperty(this, "timestamp", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});

			this.initials = initials;
			this.ip_address = ip_address;
			this.score = score;
			this.timestamp = timestamp.toISOString();
		}
	}

	class LeaderboardRequest {
		constructor(initials, numberOfEntries) {
			Object.defineProperty(this, "initials", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});

			Object.defineProperty(this, "numberOfEntries", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});

			this.initials = initials;
			this.numberOfEntries = numberOfEntries;
		}
	}

	function formatTime(dateString) {
		if (dateString && dateString != '') return DateTime.fromISO(dateString).toFormat('MMM dd,yyyy'); else return '-';
	}

	onMount(async () => {
		$$invalidate(1, highScoreLoading = true);

		setTimeout(
			() => {
				solaceClient.sendRequest('tkthetechie/leaderboard/request', JSON.stringify(new LeaderboardRequest($traderSessionStore.initials, numberOfEntries)), solace.MessageDeliveryModeType.PERSISTENT, msg => {
					$$invalidate(0, leaderboard = JSON.parse(msg));
					console.log('Received response for the leaderboard request');
					$$invalidate(1, highScoreLoading = false);
				});
			},
			2000
		);
	});

	$$self.$$set = $$props => {
		if ('numberOfEntries' in $$props) $$invalidate(3, numberOfEntries = $$props.numberOfEntries);
	};

	return [leaderboard, highScoreLoading, formatTime, numberOfEntries];
}

class Leaderboard extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { numberOfEntries: 3 });
	}
}

export default Leaderboard;