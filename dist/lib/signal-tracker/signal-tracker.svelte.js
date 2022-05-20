import './signal-tracker.svelte.css.proxy.js';
/* src/lib/signal-tracker/signal-tracker.svelte generated by Svelte v3.46.4 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	detach,
	element,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	set_data,
	set_style,
	space,
	src_url_equal,
	text,
	transition_in,
	transition_out
} from "../../../_snowpack/pkg/svelte/internal.js";

import * as handTrack from '../../../_snowpack/pkg/handtrackjs.js';
import { Moon } from '../../../_snowpack/pkg/svelte-loading-spinners.js';
import { onMount } from '../../../_snowpack/pkg/svelte.js';
import { Signal, signalStore, connectedToSolace } from '../store/store.js';
import Icon from '../../../_snowpack/pkg/svelte-awesome.js';

import {
	faHandPointer,
	faHandPaper,
	faHandRock
} from '../../../_snowpack/pkg/@fortawesome/free-solid-svg-icons.js';

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
			t = text(" Webcam Loading...");
		},
		m(target, anchor) {
			insert(target, center, anchor);
			mount_component(moon, center, null);
			append(center, t);
			current = true;
		},
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

function create_fragment(ctx) {
	let section;
	let div10;
	let t0;
	let center0;
	let video_1;
	let track;
	let t1;
	let span;
	let t2;
	let span_class_value;
	let t3;
	let div2;
	let div0;
	let img;
	let img_src_value;
	let t4;
	let div1;

	let t5_value = (/*$connectedToSolace*/ ctx[2]
	? 'CONNECTED TO'
	: 'DISCONNCECTED FROM') + "";

	let t5;
	let t6;
	let t7;
	let div9;
	let div3;
	let center1;
	let icon0;
	let t8;
	let div4;
	let center2;
	let icon1;
	let t9;
	let div5;
	let center3;
	let icon2;
	let t10;
	let div6;
	let t12;
	let div7;
	let t14;
	let div8;
	let current;
	let if_block = !/*videoStatus*/ ctx[0] && create_if_block(ctx);
	icon0 = new Icon({ props: { data: faHandPointer, scale: 2 } });
	icon1 = new Icon({ props: { data: faHandPaper, scale: 2 } });
	icon2 = new Icon({ props: { data: faHandRock, scale: 2 } });

	return {
		c() {
			section = element("section");
			div10 = element("div");
			if (if_block) if_block.c();
			t0 = space();
			center0 = element("center");
			video_1 = element("video");
			track = element("track");
			t1 = space();
			span = element("span");
			t2 = text(/*$signalStore*/ ctx[1]);
			t3 = space();
			div2 = element("div");
			div0 = element("div");
			img = element("img");
			t4 = space();
			div1 = element("div");
			t5 = text(t5_value);
			t6 = text(" SOLACE");
			t7 = space();
			div9 = element("div");
			div3 = element("div");
			center1 = element("center");
			create_component(icon0.$$.fragment);
			t8 = space();
			div4 = element("div");
			center2 = element("center");
			create_component(icon1.$$.fragment);
			t9 = space();
			div5 = element("div");
			center3 = element("center");
			create_component(icon2.$$.fragment);
			t10 = space();
			div6 = element("div");
			div6.textContent = "BUY";
			t12 = space();
			div7 = element("div");
			div7.textContent = "SELL";
			t14 = space();
			div8 = element("div");
			div8.textContent = "HOLD";
			attr(track, "kind", "captions");
			attr(video_1, "class", "videobox svelte-172xgqn");
			attr(video_1, "id", "webcam");
			set_style(video_1, "width", /*videoDimension*/ ctx[3] + "px");
			set_style(video_1, "height", /*videoDimension*/ ctx[3] + "px");
			attr(span, "class", span_class_value = "signal signal-" + /*$signalStore*/ ctx[1] + " text-4xl" + " svelte-172xgqn");
			attr(img, "class", "mt-0.5");

			if (!src_url_equal(img.src, img_src_value = "" + ((/*$connectedToSolace*/ ctx[2]
			? 'connected'
			: 'disconnected') + ".png"))) attr(img, "src", img_src_value);

			attr(img, "alt", "connected");
			attr(img, "width", "8px");
			attr(img, "height", "8px");
			attr(div1, "class", "text-left col-span-11");
			set_style(div1, "font-size", "xx-small");
			attr(div2, "class", "grid grid-cols-12");
			attr(div6, "class", "text-xs signal-BUY svelte-172xgqn");
			attr(div7, "class", "text-xs signal-SELL svelte-172xgqn");
			attr(div8, "class", "text-xs signal-HOLD svelte-172xgqn");
			attr(div9, "class", "grid grid-cols-3 mt-3 w-full h-fit content-center");
			attr(div10, "class", "bg-gray-900 p-2 rounded mt-4 shadow-xl h-fit w-full");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, div10);
			if (if_block) if_block.m(div10, null);
			append(div10, t0);
			append(div10, center0);
			append(center0, video_1);
			append(video_1, track);
			append(div10, t1);
			append(div10, span);
			append(span, t2);
			append(div10, t3);
			append(div10, div2);
			append(div2, div0);
			append(div0, img);
			append(div2, t4);
			append(div2, div1);
			append(div1, t5);
			append(div1, t6);
			append(div10, t7);
			append(div10, div9);
			append(div9, div3);
			append(div3, center1);
			mount_component(icon0, center1, null);
			append(div9, t8);
			append(div9, div4);
			append(div4, center2);
			mount_component(icon1, center2, null);
			append(div9, t9);
			append(div9, div5);
			append(div5, center3);
			mount_component(icon2, center3, null);
			append(div9, t10);
			append(div9, div6);
			append(div9, t12);
			append(div9, div7);
			append(div9, t14);
			append(div9, div8);
			current = true;
		},
		p(ctx, [dirty]) {
			if (!/*videoStatus*/ ctx[0]) {
				if (if_block) {
					if (dirty & /*videoStatus*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div10, t0);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (!current || dirty & /*$signalStore*/ 2) set_data(t2, /*$signalStore*/ ctx[1]);

			if (!current || dirty & /*$signalStore*/ 2 && span_class_value !== (span_class_value = "signal signal-" + /*$signalStore*/ ctx[1] + " text-4xl" + " svelte-172xgqn")) {
				attr(span, "class", span_class_value);
			}

			if (!current || dirty & /*$connectedToSolace*/ 4 && !src_url_equal(img.src, img_src_value = "" + ((/*$connectedToSolace*/ ctx[2]
			? 'connected'
			: 'disconnected') + ".png"))) {
				attr(img, "src", img_src_value);
			}

			if ((!current || dirty & /*$connectedToSolace*/ 4) && t5_value !== (t5_value = (/*$connectedToSolace*/ ctx[2]
			? 'CONNECTED TO'
			: 'DISCONNCECTED FROM') + "")) set_data(t5, t5_value);
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			transition_in(icon2.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			transition_out(icon2.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			if (if_block) if_block.d();
			destroy_component(icon0);
			destroy_component(icon1);
			destroy_component(icon2);
		}
	};
}

const analysisInterval = 1000;

function instance($$self, $$props, $$invalidate) {
	let $signalStore;
	let $connectedToSolace;
	component_subscribe($$self, signalStore, $$value => $$invalidate(1, $signalStore = $$value));
	component_subscribe($$self, connectedToSolace, $$value => $$invalidate(2, $connectedToSolace = $$value));

	const defaultParams = {
		flipHorizontal: true,
		outputStride: 16,
		imageScaleFactor: 1,
		maxNumBoxes: 2,
		iouThreshold: 0.2,
		scoreThreshold: 0.9,
		modelType: 'ssd320fpnlite',
		modelSize: 'medium',
		bboxLineWidth: '2',
		fontSize: 17
	};

	let videoStatus = false;
	let model;
	let video;
	let signal = Signal.INIT;
	let windowWidth, windowHeight, videoDimension = 300;

	// $: {
	// 	if (windowWidth > 600 && windowHeight > 600) {
	// 		videoDimension = 600;
	// 		console.log('Height:' + windowHeight + ',Width:' + windowWidth);
	// 	} else {
	// 		videoDimension = 300;
	// 		console.log('Height:' + windowHeight + ',Width:' + windowWidth);
	// 	}
	// }
	setInterval(
		() => {
			if (videoStatus) {
				model.detect(video).then(predictions => {
					let handPrediction = predictions.filter(prediction => prediction.label == 'open' || prediction.label == 'closed' || prediction.label == 'point');

					if (handPrediction.length) {
						if (handPrediction[0].label == 'open') signalStore.updateSignal(Signal.SELL); else if (handPrediction[0].label == 'closed') signalStore.updateSignal(Signal.HOLD); else if (handPrediction[0].label == 'point') signalStore.updateSignal(Signal.BUY);
					}
				});
			}
		},
		analysisInterval
	);

	onMount(async () => {
		video = document.getElementById('webcam');
		model = await handTrack.load(defaultParams);
		console.log('Loading webcam...');

		handTrack.startVideo(video).then(status => {
			if (status) {
				$$invalidate(0, videoStatus = true);
			}
		});
	});

	return [videoStatus, $signalStore, $connectedToSolace, videoDimension];
}

class Signal_tracker extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Signal_tracker;