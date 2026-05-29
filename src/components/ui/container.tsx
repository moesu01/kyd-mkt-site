import { Box, type BoxProps } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface ContainerProps extends BoxProps {
  children: ReactNode
}

export function Container({ children, ...props }: ContainerProps) {
  return (
    <Box mx="auto" w="full" maxW="container" {...props}>
      {children}
    </Box>
  )
}
