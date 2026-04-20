"use client"

import { useEffect, useState } from "react"

type UseRelativeTimeProps = {
  date: Date
  locale?: string
  style?: "long" | "short" | "narrow"
}

export function useRelativeTime({ date, locale = "en-US", style = "short" }: UseRelativeTimeProps) {
  const [now, setNow] = useState<number | null>(null)
  const format = (diff: number, unit: Intl.RelativeTimeFormatUnit) => new Intl.RelativeTimeFormat(locale, { style }).format(diff, unit)

  useEffect(() => {
    setNow(Date.now())
  }, [])

  if (!now) return date.toISOString()

  const diffInSeconds = Math.floor((date.getTime() - now) / 1000);
  if (diffInSeconds < 60 && diffInSeconds > -60) {
    return format(diffInSeconds, "second");
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60 && diffInMinutes > -60) {
    return format(diffInMinutes, "minute");
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24 && diffInHours > -24) {
    return format(diffInHours, "hour");
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7 && diffInDays > -7) {
    return format(diffInDays, "day");
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4 && diffInWeeks > -4) {
    return format(diffInWeeks, "week");
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12 && diffInMonths > -12) {
    return format(diffInMonths, "month");
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return format(diffInYears, "year");
}