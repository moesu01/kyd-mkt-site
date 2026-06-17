import { Box, type BoxProps } from "@chakra-ui/react"

const KYD_MARK_PATH =
  "M300 170V129.316H199.193L270.334 58.2728L241.884 29.1247L170.738 100.168V0H129.262L129.499 99.4556L58.8557 29.1247L29.6662 58.2728L101.046 129.316H0V170H300Z"

interface AboutKydMarkProps extends BoxProps {
  widthPx: number
}

export function AboutKydMark({ widthPx, ...props }: AboutKydMarkProps) {
  return (
    <Box
      as="span"
      display="block"
      w={`${widthPx}px`}
      color="fg"
      {...props}
    >
      <svg
        viewBox="0 0 300 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="auto"
        aria-hidden="true"
      >
        <path d={KYD_MARK_PATH} fill="currentColor" />
      </svg>
    </Box>
  )
}
