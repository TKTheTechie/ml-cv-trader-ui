// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".videobox.svelte-172xgqn{transform:rotateY(180deg);-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg);width:400px;height:400px}.signal.svelte-172xgqn{font-family:'VT323', monospace}.signal-BUY.svelte-172xgqn{--tw-text-opacity:1;color:rgb(21 128 61 / var(--tw-text-opacity))}.signal-SELL.svelte-172xgqn{--tw-text-opacity:1;color:rgb(185 28 28 / var(--tw-text-opacity))}.signal-HOLD.svelte-172xgqn{--tw-text-opacity:1;color:rgb(161 98 7 / var(--tw-text-opacity))}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}