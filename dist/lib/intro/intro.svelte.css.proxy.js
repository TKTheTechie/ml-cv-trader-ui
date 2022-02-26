// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".not-done.svelte-j3bkcv{color:rgb(53, 53, 53)}.done.svelte-j3bkcv{color:rgb(2, 88, 2)}.intro-text.svelte-j3bkcv{font-family:'VT323', monospace}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}