export default function Logo({
  className,
  ...props
}: React.ComponentProps<"svg"> & {
  className?: string
}) {
  return (
    <svg fill="currentColor" viewBox="0 0 128 128" className={className} {...props}>
      <rect x="8" y="8" width="112" height="112" rx="24" fill="black" />
      <path d="M36 72 L64 100 L100 36 L80 36 L64 72 L52 56 L36 56 Z" fill="white" id="V" />
      <path d="M52 56 L64 72 L76 56 L64 48 Z" fill="black" />
    </svg>
  )
}