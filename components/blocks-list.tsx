import Link from "next/link"

import { getPagesFromFolder, type PageTreeFolder } from "@/lib/page-tree"

export function BlocksList({
  blocksFolder,
}: {
  blocksFolder: PageTreeFolder
}) {
  const list = getPagesFromFolder(blocksFolder)

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
      {list.map((block) => (
        <Link
          key={block.$id}
          href={block.url}
          className="inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base"
        >
          {block.name}
        </Link>
      ))}
    </div>
  )
}