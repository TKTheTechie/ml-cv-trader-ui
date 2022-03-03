// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".not-done.svelte-15jycoh{color:rgb(53, 53, 53)}.done.svelte-15jycoh{color:rgb(2, 88, 2)}.intro-text.svelte-15jycoh{font-family:'VT323', monospace}a.svelte-15jycoh{color:green}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}