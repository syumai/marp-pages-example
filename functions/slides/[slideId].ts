export const onRequest = (async (context) => {
  const slideId = context.params.slideId;
  if (typeof slideId !== "string") {
    throw new Error("slideId must be string");
  }
  const markdown = await context.env.ASSETS.fetch(slideId);
  const markdownText = await markdown.text();
  // WIP
}) satisfies PagesFunction<unknown, "slideId">;
