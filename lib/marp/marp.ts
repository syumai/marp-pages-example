import { Marp } from "@syumai/marp-core";
import { marpTemplate } from "./template";

export const renderMarp = (md: string) => {
  const marp = new Marp();
  const { html, css } = marp.render(md);
  return marpTemplate(css, html);
};
