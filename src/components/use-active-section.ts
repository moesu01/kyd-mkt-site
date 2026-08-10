import { useEffect, useState } from "react"

/**
 * Tracks which anchored section the reader is currently in.
 *
 * Active is the last section whose top has passed a probe line just under the
 * fixed nav — not whichever section happens to intersect the viewport. Content
 * between anchors (band separators, the used-by block) therefore keeps the
 * previous answer instead of blanking the nav mid-scroll, and the hero reads
 * as no section at all.
 *
 * `sectionIds` must be in DOM order and referentially stable across renders.
 */
export function useActiveSection({
  sectionIds,
  offsetPx = 0,
}: {
  sectionIds: readonly string[]
  offsetPx?: number
}) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    let frameId = 0

    function readActiveId() {
      frameId = 0
      // +1 so a section parked exactly at the scroll-padding line by a hash
      // jump counts as reached rather than still ahead.
      const probeY = offsetPx + 1
      let reachedId: string | null = null

      for (const id of sectionIds) {
        const section = document.getElementById(id)
        if (!section) continue
        if (section.getBoundingClientRect().top > probeY) break
        reachedId = id
      }

      setActiveId(reachedId)
    }

    function handleViewportChange() {
      if (frameId) return
      frameId = window.requestAnimationFrame(readActiveId)
    }

    readActiveId()
    window.addEventListener("scroll", handleViewportChange, { passive: true })
    window.addEventListener("resize", handleViewportChange)

    return () => {
      window.removeEventListener("scroll", handleViewportChange)
      window.removeEventListener("resize", handleViewportChange)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [sectionIds, offsetPx])

  return { activeId }
}
