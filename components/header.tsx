import Link from "next/link";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { GitHubLink } from "./github-link";
import { ModeToggle } from "./mode-toggle";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="w-full bg-background">
      <div className="container-wrapper px-6 group-has-data-[slot=designer]/layout:max-w-none 3xl:fixed:px-0">
        <div className="flex justify-between gap-4 h-(--header-height) items-center **:data-[slot=separator]:h-4! group-has-data-[slot=designer]/layout:fixed:max-w-none 3xl:fixed:container">
          <Button render={<Link className="flex items-center gap-2" href="/" />} nativeButton={false} variant="ghost" className="h-12 my-1">
            <Logo className="!size-9" />
          </Button>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="https://blog.vinkas.com" target="_blank">Blog</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <Button render={<Link href="/" />} nativeButton={false}>
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