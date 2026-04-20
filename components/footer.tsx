import UTMLink from "@/registry/components/ui/utm-link";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-muted py-4">
      <div className="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
        <div className="flex flex-col gap-4">
          <div className="text-center text-xs text-muted-foreground">
            Built by <UTMLink href="https://vinothkannan.com" source="vinkas" medium="footer" campaign="ui" target="_blank" rel="noopener" className="font-medium underline underline-offset-4">Vinoth Kannan</UTMLink> at <UTMLink href="https://vinkas.com" source="vinkas" medium="footer" campaign="ui" target="_blank" rel="noopener" className="font-bold underline underline-offset-4">Vinkas</UTMLink>. The source code is available on <Link href="https://github.com/vinkashq/ui" target="_blank" rel="noopener" className="font-medium underline underline-offset-4">GitHub</Link>.
          </div>
        </div>
      </div>
    </footer>
  )
}