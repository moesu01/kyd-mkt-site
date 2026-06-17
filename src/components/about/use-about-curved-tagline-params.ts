import { useEffect, useState } from "react"
import {
  ABOUT_CURVED_TAGLINE_MOBILE_BREAKPOINT_PX,
  aboutCurvedTaglineMobileParams,
  type CurvedTaglineParams,
} from "./about-curved-tagline-dial"

interface DialCurvedTaglineValues {
  typography: CurvedTaglineParams["typography"]
  path: CurvedTaglineParams["path"]
  mark: CurvedTaglineParams["mark"]
  stack: CurvedTaglineParams["stack"]
}

export function useAboutCurvedTaglineParams(
  dial: DialCurvedTaglineValues,
): CurvedTaglineParams {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(
      `(max-width: ${ABOUT_CURVED_TAGLINE_MOBILE_BREAKPOINT_PX}px)`,
    ).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${ABOUT_CURVED_TAGLINE_MOBILE_BREAKPOINT_PX}px)`,
    )

    const handleChange = () => {
      setIsMobile(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  if (isMobile) return aboutCurvedTaglineMobileParams

  return {
    typography: dial.typography,
    path: dial.path,
    mark: dial.mark,
    stack: dial.stack,
  }
}
