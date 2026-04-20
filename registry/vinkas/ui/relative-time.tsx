"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRelativeTime } from "../hooks/use-relative-time";

type RelativeTimeProps = {
  date: Date
  locale?: string
  style?: "long" | "short" | "narrow"
} & React.ComponentPropsWithoutRef<typeof TooltipTrigger>;

export function RelativeTime({ date, locale = "en-US", style = "short", ...props }: RelativeTimeProps) {
  const time = useRelativeTime({ date, locale, style })
  const localeString = date.toLocaleString(locale, { dateStyle: "long", timeStyle: "long" })

  return (
    <Tooltip>
      <TooltipTrigger {...props}>
        {time}
      </TooltipTrigger>
      <TooltipContent>
        {localeString}
      </TooltipContent>
    </Tooltip>
  )
}