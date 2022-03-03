import './intro.svelte.css.proxy.js';
/* src/lib/intro/intro.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	listen,
	mount_component,
	run_all,
	safe_not_equal,
	set_input_value,
	space,
	text,
	transition_in,
	transition_out
} from "../../../_snowpack/pkg/svelte/internal.js";

import { getContext, onDestroy } from '../../../_snowpack/pkg/svelte.js';
import Icon from '../../../_snowpack/pkg/svelte-awesome.js';
import { checkCircle } from '../../../_snowpack/pkg/svelte-awesome/icons.js';

import {
	signalStore,
	Signal,
	traderSessionStore,
	TraderSession
} from '../store/store.js';

import { SOLACE_CLIENT_CONTEXT_KEY } from '../solace-client.js';
import solace from '../../../_snowpack/pkg/solclientjs.js';

function create_if_block(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "Please fill out this field.";
			attr(p, "class", "text-red-500 text-xs italic mb-1");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

function create_fragment(ctx) {
	let section;
	let div0;
	let t1;
	let div12;
	let t2;
	let a0;
	let t4;
	let a1;
	let t6;
	let br0;
	let t7;
	let br1;
	let t8;
	let div10;
	let div1;
	let t9;
	let div2;
	let t10;
	let div3;
	let t11;
	let div4;
	let t13;
	let div5;
	let t15;
	let div6;
	let t17;
	let div7;
	let icon0;
	let div7_class_value;
	let t18;
	let div8;
	let icon1;
	let div8_class_value;
	let t19;
	let div9;
	let icon2;
	let div9_class_value;
	let t20;
	let div11;
	let label;
	let t22;
	let t23;
	let center3;
	let input;
	let t24;
	let button;
	let current;
	let mounted;
	let dispose;
	icon0 = new Icon({ props: { data: checkCircle, scale: 2 } });
	icon1 = new Icon({ props: { data: checkCircle, scale: 2 } });
	icon2 = new Icon({ props: { data: checkCircle, scale: 2 } });
	let if_block = !/*validForm*/ ctx[4] && create_if_block(ctx);

	return {
		c() {
			section = element("section");
			div0 = element("div");
			div0.innerHTML = `<h1 class="justify-center mb-1 text-xl font-bold tracking-tighter text-center text-white lg:text-center lg:text-xl title-font w-max">cv-ml-trader</h1>`;
			t1 = space();
			div12 = element("div");
			t2 = text("cv-ml-trader - short for 'computer vision-machine learning-trader' - is a a demo/experiment that runs gesture recognition from your webcam's video stream in order to determine whether to buy or\n    sell stocks while consuming a simulated market data feed over ");
			a0 = element("a");
			a0.textContent = "Solace PubSub+";
			t4 = text(" and sending the end result back to\n    ");
			a1 = element("a");
			a1.textContent = "Solace";
			t6 = text("\n    for processing on the server side.\n    ");
			br0 = element("br");
			t7 = space();
			br1 = element("br");
			t8 = text("\n    There are three gestures that can be detected - try them now (use your right hand, against a clear background and away from your face as shown in the images below for best results):\n\n    ");
			div10 = element("div");
			div1 = element("div");
			div1.innerHTML = `<center><img height="90px" width="126px" alt="BUY" src="buy.png"/></center>`;
			t9 = space();
			div2 = element("div");
			div2.innerHTML = `<center><img height="90px" width="126px" alt="SELL" src="sell.png"/></center>`;
			t10 = space();
			div3 = element("div");
			div3.innerHTML = `<center><img height="90px" width="126px" alt="HOLD" src="hold.png"/></center>`;
			t11 = space();
			div4 = element("div");
			div4.textContent = "BUY";
			t13 = space();
			div5 = element("div");
			div5.textContent = "SELL";
			t15 = space();
			div6 = element("div");
			div6.textContent = "HOLD";
			t17 = space();
			div7 = element("div");
			create_component(icon0.$$.fragment);
			t18 = space();
			div8 = element("div");
			create_component(icon1.$$.fragment);
			t19 = space();
			div9 = element("div");
			create_component(icon2.$$.fragment);
			t20 = space();
			div11 = element("div");
			label = element("label");
			label.textContent = "Initials";
			t22 = space();
			if (if_block) if_block.c();
			t23 = space();
			center3 = element("center");
			input = element("input");
			t24 = space();
			button = element("button");
			button.textContent = "BEGIN TRADING";
			attr(div0, "class", "flex flex-col w-full items-center");
			attr(a0, "href", "https://solace.com/try-it-now/");
			attr(a0, "target", "_blank");
			attr(a0, "class", "svelte-15jycoh");
			attr(a1, "href", "https://www.solace.com");
			attr(a1, "target", "_blank");
			attr(a1, "class", "svelte-15jycoh");
			attr(div1, "class", "items-center");
			attr(div4, "class", "text-center signal signal-BUY text-xl h-fit shrink");
			attr(div5, "class", "text-center signal signal-SELL text-xl h-fit shrink");
			attr(div6, "class", "text-center signal signal-HOLD text-xl h-fit shrink");
			attr(div7, "class", div7_class_value = "text-center h-fit shrink " + (/*buyDone*/ ctx[0] ? 'done' : 'not-done') + "" + " svelte-15jycoh");
			attr(div8, "class", div8_class_value = "text-center h-fit shrink " + (/*sellDone*/ ctx[1] ? 'done' : 'not-done') + " svelte-15jycoh");
			attr(div9, "class", div9_class_value = "text-center h-fit shrink " + (/*holdDone*/ ctx[2] ? 'done' : 'not-done') + " svelte-15jycoh");
			attr(div10, "class", "grid grid-cols-3 mt-5");
			attr(label, "class", "block uppercase tracking-wide text-white-700 text-xs font-bold mb-2");
			attr(label, "for", "initials");
			attr(input, "class", "appearance-none w-12 block text-center bg-gray-200 text-gray-700 border rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white");
			attr(input, "id", "initials");
			attr(input, "type", "text");
			attr(input, "placeholder", "TK");
			attr(input, "maxlength", "2");
			attr(button, "class", "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ");
			attr(div11, "class", "w-full items-center text-center mt-10");
			attr(div12, "class", "text-xl tracking-tighter text-white intro-text svelte-15jycoh");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, div0);
			append(section, t1);
			append(section, div12);
			append(div12, t2);
			append(div12, a0);
			append(div12, t4);
			append(div12, a1);
			append(div12, t6);
			append(div12, br0);
			append(div12, t7);
			append(div12, br1);
			append(div12, t8);
			append(div12, div10);
			append(div10, div1);
			append(div10, t9);
			append(div10, div2);
			append(div10, t10);
			append(div10, div3);
			append(div10, t11);
			append(div10, div4);
			append(div10, t13);
			append(div10, div5);
			append(div10, t15);
			append(div10, div6);
			append(div10, t17);
			append(div10, div7);
			mount_component(icon0, div7, null);
			append(div10, t18);
			append(div10, div8);
			mount_component(icon1, div8, null);
			append(div10, t19);
			append(div10, div9);
			mount_component(icon2, div9, null);
			append(div12, t20);
			append(div12, div11);
			append(div11, label);
			append(div11, t22);
			if (if_block) if_block.m(div11, null);
			append(div11, t23);
			append(div11, center3);
			append(center3, input);
			set_input_value(input, /*initials*/ ctx[3]);
			append(div11, t24);
			append(div11, button);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler*/ ctx[7]),
					listen(button, "click", /*submitInitials*/ ctx[5])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*buyDone*/ 1 && div7_class_value !== (div7_class_value = "text-center h-fit shrink " + (/*buyDone*/ ctx[0] ? 'done' : 'not-done') + "" + " svelte-15jycoh")) {
				attr(div7, "class", div7_class_value);
			}

			if (!current || dirty & /*sellDone*/ 2 && div8_class_value !== (div8_class_value = "text-center h-fit shrink " + (/*sellDone*/ ctx[1] ? 'done' : 'not-done') + " svelte-15jycoh")) {
				attr(div8, "class", div8_class_value);
			}

			if (!current || dirty & /*holdDone*/ 4 && div9_class_value !== (div9_class_value = "text-center h-fit shrink " + (/*holdDone*/ ctx[2] ? 'done' : 'not-done') + " svelte-15jycoh")) {
				attr(div9, "class", div9_class_value);
			}

			if (!/*validForm*/ ctx[4]) {
				if (if_block) {
					
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div11, t23);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*initials*/ 8 && input.value !== /*initials*/ ctx[3]) {
				set_input_value(input, /*initials*/ ctx[3]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			transition_in(icon2.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			transition_out(icon2.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			destroy_component(icon0);
			destroy_component(icon1);
			destroy_component(icon2);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let buyDone = false, sellDone = false, holdDone = false;
	let initials = '', validForm = true;
	let { beginTrading = false } = $$props;
	let solaceClient = getContext(SOLACE_CLIENT_CONTEXT_KEY);

	function submitInitials() {
		if (initials.length > 0 && initials.length < 3) {
			console.log('Publishing new session event...');
			solaceClient.publishToTopic('tkthetechie/new/trading/session', '{"initials":"' + initials + '"}', solace.MessageDeliveryModeType.PERSISTENT);
			let traderSession;
			traderSession = new TraderSession(initials, '-');
			traderSessionStore.updateSession(traderSession);
			$$invalidate(4, validForm = true);
			$$invalidate(6, beginTrading = true);
			signalStore.updateSignal(Signal.INIT);
		} else //   .then((response) => response.json())
		//   .then((val) => {
		//     traderSession = new TraderSession(initials, val.ip);
		//     console.log('Trader: ' + JSON.stringify(traderSession) + ' logged in');
		//   })
		//   .catch((err) => {
		//     console.log('Unable to determine ip-address of user ' + initials);
		//     traderSession = new TraderSession(initials, '-');
		//   })
		//   .finally(() => {
		//     traderSessionStore.updateSession(traderSession);
		// validForm = true;
		// beginTrading = true;
		// signalStore.updateSignal(Signal.INIT);
		//   });
		{
			$$invalidate(4, validForm = false); // fetch('https://api.ipify.org?format=json')
		}
	}

	const unsubscribe = signalStore.subscribe(signal => {
		switch (signal) {
			case Signal.BUY:
				$$invalidate(0, buyDone = true);
				break;
			case Signal.HOLD:
				$$invalidate(2, holdDone = true);
				break;
			case Signal.SELL:
				$$invalidate(1, sellDone = true);
				break;
			default:
				break;
		}
	});

	onDestroy(unsubscribe);

	function input_input_handler() {
		initials = this.value;
		$$invalidate(3, initials);
	}

	$$self.$$set = $$props => {
		if ('beginTrading' in $$props) $$invalidate(6, beginTrading = $$props.beginTrading);
	};

	return [
		buyDone,
		sellDone,
		holdDone,
		initials,
		validForm,
		submitInitials,
		beginTrading,
		input_input_handler
	];
}

class Intro extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { beginTrading: 6 });
	}
}

export default Intro;