import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-muted py-4">
      <div className="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
        <div className="flex flex-col gap-4">
          <div className="text-center text-xs text-muted-foreground">
            Built by <Link href="https://vinothkannan.com" className="font-medium underline underline-offset-4" target="_blank">Vinoth Kannan</Link> at <Link href="https://vinkas.com" className="font-bold underline underline-offset-4" target="_blank">Vinkas</Link>. The source code is available on <Link href="https://github.com/vinkashq/ui" className="font-medium underline underline-offset-4" target="_blank">GitHub</Link>.
          </div>
        </div>
      </div>
    </footer>
  )
}