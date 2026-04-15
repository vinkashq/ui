"use client"

import { cn } from "@/lib/utils"
import NumberFlow from '@number-flow/react'
import { useEffect, useState } from "react"

type CountdownTimerProps = {
  date: Date,
  className?: string,
} & React.ComponentProps<"div">

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const getTimeDiff = (target: Date, now: Date) => {
  let diff = Math.max(0, target.getTime() - now.getTime())

  const days = Math.trunc(diff / DAY)
  diff %= DAY

  const hours = Math.trunc(diff / HOUR)
  diff %= HOUR

  const minutes = Math.trunc(diff / MINUTE)
  diff %= MINUTE

  const seconds = Math.trunc(diff / SECOND)

  return { days, hours, minutes, seconds }
}

export default function CountdownTimer({ date, className, ...props }: CountdownTimerProps) {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const tick = () => {
      setNow(new Date())
      timeout = setTimeout(tick, 1000)
    }

    tick()

    return () => clearTimeout(timeout)
  }, [])

  if (!now) return null

  const { days, hours, minutes, seconds } = getTimeDiff(date, now)

  return (
    <div className={cn("flex justify-around items-center text-center gap-2", className)} {...props}>
      <div className="flex flex-col gap-1">
        <NumberFlow className="text-lg font-bold" value={days} />
        <span className="text-sm text-muted-foreground">Days</span>
      </div>
      <div className="flex flex-col gap-1">
        <NumberFlow className="text-lg font-bold" value={hours} />
        <span className="text-sm text-muted-foreground">Hours</span>
      </div>
      <div className="flex flex-col gap-1">
        <NumberFlow className="text-lg font-bold" value={minutes} />
        <span className="text-sm text-muted-foreground">Minutes</span>
      </div>
      <div className="flex flex-col gap-1">
        <NumberFlow className="text-lg font-bold" value={seconds} />
        <span className="text-sm text-muted-foreground">Seconds</span>
      </div>
    </div>
  )
}