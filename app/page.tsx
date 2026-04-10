import { RelativeTime } from "@/registry/vinkas/ui/relative-time";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputCopyable } from "@/registry/vinkas/ui/input-copyable";
import { SiShadcnui } from "@icons-pack/react-simple-icons";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const janDate = new Date()
  const decDate = new Date()
  janDate.setMonth(0)
  decDate.setMonth(12)

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-grid">
        <div className="container-wrapper">
          <div className="container flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4 mx-auto">
            <Badge variant="secondary" render={<Link href="/docs#installation" />} className="gap-2">
              <SiShadcnui />
              shadcn/ui registry
              <ArrowRight />
            </Badge>
            <h1 className="leading-tighter text-3xl font-semibold tracking-tight text-balance text-primary lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl">
              <span className="font-bold">Vinkas</span> UI
            </h1>
            <p className="max-w-4xl text-base text-balance text-foreground sm:text-lg">Open-source Base UI React components you can customize, extend, and build on.</p>
            <div className="flex gap-2">
              <Button render={<Link href="/docs" />} nativeButton={false}>
                Get Started
              </Button>
              <Button render={<Link href="/docs/components" />} nativeButton={false} variant="ghost">
                Components
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="container-wrapper flex-1 pb-6">
        <div className="container overflow-hidden">
          <section className="theme-container">
            <div className="mx-auto grid gap-8 py-1 theme-container md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:gap-8">
              <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
                <InputCopyable value="Hello World!" />
              </div>
              <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
                <RelativeTime date={janDate} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
