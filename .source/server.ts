// @ts-nocheck
import * as __fd_glob_6 from "../content/docs/components/utm-link.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/components/relative-time.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/components/input-copyable.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/components/index.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/components/copyright-text.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/(root)/index.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, }, {"(root)/index.mdx": __fd_glob_1, "components/copyright-text.mdx": __fd_glob_2, "components/index.mdx": __fd_glob_3, "components/input-copyable.mdx": __fd_glob_4, "components/relative-time.mdx": __fd_glob_5, "components/utm-link.mdx": __fd_glob_6, });