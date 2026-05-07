import { RelativeTime } from "@/registry/components/ui/relative-time";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputCopyable } from "@/registry/components/ui/input-copyable";
import { SiShadcnui } from "@icons-pack/react-simple-icons";
import { ArrowRight, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import UTMLink from "@/registry/components/ui/utm-link";
import CopyrightText from "@/registry/components/ui/copyright-text";
import CountdownTimer from "@/registry/components/blocks/countdown-timer";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Itinerary from "@/registry/components/blocks/itinerary";

export default function Home() {
  const janDate = new Date()
  const decDate = new Date()
  janDate.setMonth(0)
  decDate.setMonth(11, 25)
  decDate.setHours(0, 0, 0, 0)
  const itineraryData = [{
    "name": "Place 1",
    "longitude": -74.006,
    "latitude": 40.7128,
  }, {
    "name": "Place 2",
    "longitude": -73.9857,
    "latitude": 40.7580,
  }, {
    "name": "Place 3",
    "longitude": -73.9780,
    "latitude": 40.7829,
  }]

  const examples = [
    {
      id: "itinerary",
      title: "Itinerary",
      description: "Displays a list of travel plans in a map",
      url: "/docs/blocks/itinerary",
      component: (
        <>
          <Itinerary data={itineraryData} />
        </>
      ),
    },
    {
      id: "countdown-timer",
      title: "Countdown Timer",
      description: "Displays countdown to a specific date.",
      url: "/docs/blocks/countdown-timer",
      component: (
        <>
          <CountdownTimer date={decDate} />
        </>
      ),
    }, {
      id: "input-copyable",
      title: "Input Copyable",
      description: "Input component with copy button to copy the value to clipboard",
      url: "/docs/components/input-copyable",
      component: (
        <>
          <InputCopyable value="Hello World!" className="w-fit! md:w-full! mx-auto" />
        </>
      ),
    }, {
      id: "relative-time",
      title: "Relative Time",
      description: "Displays the relative time to the given date.",
      url: "/docs/components/relative-time",
      component: (
        <div className="flex flex-col gap-4">
          <RelativeTime date={janDate} />
          <RelativeTime date={janDate} style="short" locale="ta" />
          <RelativeTime date={decDate} style="long" locale="zh-CN" />
        </div>
      ),
    }, {
      id: "utm-link",
      title: "UTM Link",
      description: "Link that automatically adds UTM params to the href on click",
      url: "/docs/components/utm-link",
      component: (
        <UTMLink className="text-center block" href="https://vinkas.com" source="vinkas" medium="utm-link" campaign="ui" target="_blank" rel="noopener">Click Me</UTMLink>
      )
    }, {
      id: "copyright-text",
      title: "Copyright Text",
      description: "Text component that displays the copyright information",
      url: "/docs/components/copyright-text",
      component: (
        <CopyrightText companyName="Acme Inc." />
      )
    }
  ]

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
      <div className="overflow-hidden px-4 md:px-2">
        <section className="theme-container">
          <div className="columns-xs gap-4 space-y-4 p-4 [&>[data-slot=card]]:max-w-md [&>[data-slot=card]]:mx-auto [&>[data-slot=card]]:break-inside-avoid mx-auto">
            {examples.map((component, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>
                    <Link href={component.url}>
                      {component.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{component.description}</CardDescription>
                  <CardAction>
                    <Link href={component.url}>
                      <ChevronRightIcon className="size-4 text-muted-foreground" />
                    </Link>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  {component.component}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
