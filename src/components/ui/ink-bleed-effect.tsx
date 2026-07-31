import { Box, type BoxProps } from "@chakra-ui/react"
import { useId, type ReactNode } from "react"

interface InkBleedEffectProps extends BoxProps {
  children: ReactNode
}

/**
 * Preserved text treatment for future creative use.
 * Wrap text with this component to restore the soft discrete-alpha bleed.
 */
export function InkBleedEffect({
  children,
  ...props
}: InkBleedEffectProps) {
  const filterId = `ink-bleed-${useId().replaceAll(":", "")}`

  return (
    <Box position="relative" {...props}>
      <svg
        width="0"
        height="0"
        aria-hidden
        focusable="false"
        style={{ position: "absolute" }}
      >
        <filter id={filterId} colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1 1 1" />
          </feComponentTransfer>
        </filter>
      </svg>
      <Box filter={`blur(0.7px) url(#${filterId})`}>{children}</Box>
    </Box>
  )
}
