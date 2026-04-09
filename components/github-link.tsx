import Link from "next/link"
import { Button } from "./ui/button"
import { Suspense } from "react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { Skeleton } from "./ui/skeleton"

export function GitHubLink() {
  return (
    <Button render={<Link href="https://github.com/vinkashq/ui" target="_blank" rel="noreferrer" />} nativeButton={false} variant="ghost" className="h-8 shadow-none">
      <SiGithub />
      <Suspense fallback={<Skeleton className="h-4 w-[42px]" />}>
        <StarsCount />
      </Suspense>
    </Button>
  )
}

export async function StarsCount() {
  const data = await fetch("https://api.github.com/repos/vinkashq/ui", {
    next: { revalidate: 86400 },
  })
  const json = await data.json()

  const formattedCount =
    json.stargazers_count >= 1000
      ? `${Math.round(json.stargazers_count / 1000)}k`
      : json.stargazers_count?.toLocaleString()

  return (
    <span className="w-fit text-xs text-muted-foreground tabular-nums">
      {formattedCount}
    </span>
  )
}