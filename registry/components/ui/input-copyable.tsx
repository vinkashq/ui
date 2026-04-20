"use client"

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Check, Copy } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useCopyToClipboard } from "usehooks-ts"

type InputCopyableProps = {
  value: string
} & React.ComponentProps<typeof InputGroup>

export function InputCopyable(props: InputCopyableProps) {
  const [copied, copy] = useCopyToClipboard()

  const CopyButton = ({ copied }: { copied: string | null }) => {
    if (copied) {
      return (
        <Tooltip defaultOpen={true}>
          <TooltipTrigger render={<Check />} />
          <TooltipContent>Copied!</TooltipContent>
        </Tooltip>
      )
    }

    return (
      <Tooltip>
        <TooltipTrigger render={<Copy />} />
        <TooltipContent>Copy</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <InputGroup {...props}>
      <InputGroupInput value={props.value} readOnly className="overflow-ellipsis" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Copy"
          title="Copy"
          size="icon-xs"
          onClick={() => {
            copy(props.value)
          }}
        >
          <CopyButton copied={copied} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}