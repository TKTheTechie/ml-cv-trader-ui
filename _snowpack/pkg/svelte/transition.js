import { V as identity } from '../common/index-126f158f.js';

function fade(node, {delay = 0, duration = 400, easing = identity} = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}

export { fade };
