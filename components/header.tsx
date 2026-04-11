import Link from "next/link";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { GitHubLink } from "./github-link";
import { ModeToggle } from "./mode-toggle";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background">
      <div className="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
        <div className="flex justify-between gap-4 my-2 h-(--header-height) items-center **:data-[slot=separator]:h-4! group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container">
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-2 h-8" href="/">
              <Logo className="!size-8" />
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/docs/components">Components</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-2">
            <Button render={<Link href="/docs" />} nativeButton={false} className="hidden md:flex">
              Get Started
            </Button>
            <GitHubLink />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}