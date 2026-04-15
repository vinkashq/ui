// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"(root)/index.mdx": () => import("../content/docs/(root)/index.mdx?collection=docs"), "blocks/countdown-timer.mdx": () => import("../content/docs/blocks/countdown-timer.mdx?collection=docs"), "blocks/index.mdx": () => import("../content/docs/blocks/index.mdx?collection=docs"), "components/copyright-text.mdx": () => import("../content/docs/components/copyright-text.mdx?collection=docs"), "components/index.mdx": () => import("../content/docs/components/index.mdx?collection=docs"), "components/input-copyable.mdx": () => import("../content/docs/components/input-copyable.mdx?collection=docs"), "components/relative-time.mdx": () => import("../content/docs/components/relative-time.mdx?collection=docs"), "components/utm-link.mdx": () => import("../content/docs/components/utm-link.mdx?collection=docs"), }),
};
export default browserCollections;