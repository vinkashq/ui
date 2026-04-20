"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRelativeTime } from "../hooks/use-relative-time";

type RelativeTimeProps = {
  date: Date
  locale?: string
} & React.ComponentPropsWithoutRef<typeof TooltipTrigger>;

export function RelativeTime({ date, locale = "en-US", ...props }: RelativeTimeProps) {
  const time = useRelativeTime({ date, locale })
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