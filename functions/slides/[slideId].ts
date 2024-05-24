import { renderMarp } from "../../lib/marp/marp";

export const onRequest = (async (context) => {
  const slideId = context.params.slideId;
  if (typeof slideId !== "string") {
    throw new Error("slideId must be string");
  }
  const url = new URL(`../slideFiles/${slideId}.md`, context.request.url);
  const res = await context.env.ASSETS.fetch(url);
  return new Response(renderMarp(await res.text()), {
    headers: { "Content-Type": "text/html" },
  });
}) satisfies PagesFunction<unknown, "slideId">;
