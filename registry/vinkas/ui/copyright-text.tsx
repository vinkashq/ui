import { cn } from "@/lib/utils"

type CopyrightTextProps = {
  companyName: string,
  startYear?: number,
  endYear?: number,
  showRights?: boolean,
  rightsText?: string,
  className?: string,
} & React.ComponentProps<"p">

export default function CopyrightText({
  companyName,
  startYear,
  endYear = new Date().getFullYear(),
  showRights = true,
  rightsText = "All rights reserved.",
  className,
  ...props
}: CopyrightTextProps) {
  const showStartYear = startYear !== undefined && startYear !== endYear
  const years = showStartYear
    ? `${startYear}\u2013${endYear}`
    : `${endYear}`

  const name = companyName.trim()
  const needsPeriod = !name.endsWith(".")
  const rights = showRights && rightsText
    ? `${needsPeriod ? "." : ""} ${rightsText}`
    : ""

  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props}>
      &copy; {years} {name}{rights}
    </p>
  )
}