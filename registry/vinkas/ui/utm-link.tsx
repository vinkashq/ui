"use client"

import Link from "next/link"

type UTMLinkProps = {
  href: string
  children: React.ReactNode
  source?: string
  medium?: string
  campaign?: string
} & React.ComponentProps<typeof Link>

export default function UTMLink({
  href,
  children,
  source,
  medium,
  campaign,
  onMouseDown,
  onClick,
  ...props
}: UTMLinkProps) {
  const applySearchParams = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented) return
    if (e.button !== 0 && e.type !== "click") return
    if (!source && !medium && !campaign) return

    const hrefAttr = e.currentTarget.getAttribute("href")
    if (!hrefAttr || hrefAttr.startsWith("#")) {
      return
    }

    const url = new URL(e.currentTarget.href)

    if (url.protocol !== "http:" && url.protocol !== "https:") return

    if (
      (!source || url.searchParams.has("utm_source")) &&
      (!medium || url.searchParams.has("utm_medium")) &&
      (!campaign || url.searchParams.has("utm_campaign"))
    ) {
      return
    }

    if (source && !url.searchParams.has("utm_source")) {
      url.searchParams.set("utm_source", source)
    }
    if (medium && !url.searchParams.has("utm_medium")) {
      url.searchParams.set("utm_medium", medium)
    }
    if (campaign && !url.searchParams.has("utm_campaign")) {
      url.searchParams.set("utm_campaign", campaign)
    }

    e.currentTarget.href = url.toString()
  }

  return (
    <Link
      href={href}
      onMouseDown={(e) => {
        onMouseDown?.(e)
        applySearchParams(e)
      }}
      onClick={(e) => {
        onClick?.(e)
        if (e.detail === 0) applySearchParams(e)
      }}
      {...props}>
      {children}
    </Link>
  )
}