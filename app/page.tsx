import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { DrawerDialog, DrawerDialogContent, DrawerDialogContentWrapper, DrawerDialogDescription, DrawerDialogFooter, DrawerDialogHeader, DrawerDialogTitle, DrawerDialogTrigger } from "@/registry/new-york/blocks/drawer-dialog/drawer-dialog"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Vinkas UI</h1>
        <p className="text-muted-foreground">
          A collection of components using shadcn that you can customize and extend.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A simple component that works as a dialog component in desktop and as a drawer component in other screens.
            </h2>
            <OpenInV0Button name="drawer-dialog" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <DrawerDialog>
              <DrawerDialogTrigger>
                <Button>Open Drawer Dialog</Button>
              </DrawerDialogTrigger>
              <DrawerDialogContent>
                <DrawerDialogHeader>
                  <DrawerDialogTitle>Drawer Dialog</DrawerDialogTitle>
                  <DrawerDialogDescription>
                    A simple component that works as a dialog component in desktop and as a drawer component in other screens.
                  </DrawerDialogDescription>
                </DrawerDialogHeader>
                <DrawerDialogContentWrapper>
                  Hello world!
                </DrawerDialogContentWrapper>
                <DrawerDialogFooter>
                  <Button>Example Footer Button</Button>
                </DrawerDialogFooter>
              </DrawerDialogContent>
            </DrawerDialog>
          </div>
        </div>

        <Button variant="outline" asChild>
          <Link href="https://github.com/vinkashq/ui">
            <Github />
            Source Code
          </Link>
        </Button>
      </main>
    </div>
  )
}
