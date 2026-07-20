import { useEffect, useState } from "react"
import {
  ABOUT_CURVED_TAGLINE_MOBILE_BREAKPOINT_PX,
  aboutCurvedTaglineMobileParams,
  type CurvedTaglineParams,
} from "./about-curved-tagline-dial"

const SHORT_VIEWPORT_MAX_HEIGHT_PX = 901

interface DialCurvedTaglineValues {
  typography: CurvedTaglineParams["typography"] & {
    shortViewportFontSizeMax: number
  }
  path: CurvedTaglineParams["path"]
  mark: CurvedTaglineParams["mark"] & {
    shortViewportWidthMax: number
  }
  layout: CurvedTaglineParams["layout"] & {
    shortViewportMarkAlign: number
  }
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
  const [isShortViewport, setIsShortViewport] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia(
      `(max-height: ${SHORT_VIEWPORT_MAX_HEIGHT_PX}px)`,
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

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-height: ${SHORT_VIEWPORT_MAX_HEIGHT_PX}px)`,
    )

    const handleChange = () => {
      setIsShortViewport(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  if (isMobile) return aboutCurvedTaglineMobileParams

  return {
    typography: isShortViewport
      ? {
          ...dial.typography,
          fontSizeMax: Number(dial.typography.shortViewportFontSizeMax),
        }
      : dial.typography,
    path: dial.path,
    mark: isShortViewport
      ? {
          ...dial.mark,
          widthMax: Number(dial.mark.shortViewportWidthMax),
        }
      : dial.mark,
    layout: isShortViewport
      ? {
          ...dial.layout,
          markAlign: Number(dial.layout.shortViewportMarkAlign),
        }
      : dial.layout,
  }
}
