import { Marp } from "@marp-team/marp-core";

export const onRequest = (async (context) => {
  const slideId = context.params.slideId;
  if (typeof slideId !== "string") {
    throw new Error("slideId must be string");
  }
  const url = new URL(`../slideFiles/${slideId}.md`, context.request.url);
  const markdown = await context.env.ASSETS.fetch(url);
  const markdownText = await markdown.text();
  const marp = new Marp();
  const { html, css } = marp.render(markdownText);
  return new Response(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <style>${css}</style>
    <style>
html, body, .marpit {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  background-color: #000;
}

.marpit {
  display: flex;
  justify-content: center;
  align-items: center;
}

svg[data-marpit-svg=""] {
  position: absolute;
}

section {
  opacity: 0;
}

.bespoke-inactive {
  opacity: 0;
}

.bespoke-active {
  pointer-events: auto;
  opacity: 1;
}
    </style>
  </head>
  <body>
    ${html}
    <script src="https://unpkg.com/bespoke@1.1.0/dist/bespoke.min.js"></script>
    <script src="https://unpkg.com/bespoke-classes@1.0.0/dist/bespoke-classes.js"></script>
    <script src="https://unpkg.com/bespoke-keys@1.1.0/dist/bespoke-keys.min.js"></script>
    <script src="https://unpkg.com/bespoke-hash@1.0.2/dist/bespoke-hash.min.js"></script>
    <script>
    bespoke.from({
      parent: '.marpit',
      slides: 'section'
    }, [
      bespoke.plugins.classes(),
      bespoke.plugins.keys(),
      bespoke.plugins.hash(),
    ]);
    </script>
  </body></html>
  `, {
    headers: { "Content-Type": "text/html" },
  });
}) satisfies PagesFunction<unknown, "slideId">;
