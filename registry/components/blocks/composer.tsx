"use client"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { useState } from "react"

type ComposerProps = {
  text?: string
} & React.ComponentProps<"div">

export default function Composer({ text, className, ...props }: ComposerProps) {
  const [markdown, setMarkdown] = useState(text)
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      <InputGroup>
        <InputGroupTextarea
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
          className="min-h-[200px]"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText>
            script.js
          </InputGroupText>
          <InputGroupButton className="ml-auto" size="icon-xs">
a
          </InputGroupButton>
          <InputGroupButton variant="ghost" size="icon-xs">
b
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <div>{markdown}</div>
    </div>
  )
}