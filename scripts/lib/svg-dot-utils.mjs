import { mkdirSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"

export const VIEWBOX_SIZE = 132

export function getPathCentroid(pathData, fallback = VIEWBOX_SIZE / 2) {
  const numbers = pathData.match(/-?\d*\.?\d+/g)?.map(Number) ?? []
  const points = []

  for (let index = 0; index + 1 < numbers.length; index += 2) {
    points.push({ x: numbers[index], y: numbers[index + 1] })
  }

  if (points.length === 0) {
    return { x: fallback, y: fallback }
  }

  const sum = points.reduce(
    (accumulator, point) => ({
      x: accumulator.x + point.x,
      y: accumulator.y + point.y,
    }),
    { x: 0, y: 0 },
  )

  return {
    x: Number((sum.x / points.length).toFixed(3)),
    y: Number((sum.y / points.length).toFixed(3)),
  }
}

export function writeDotsFile(outputPath, dots) {
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, `${JSON.stringify(dots, null, 2)}\n`)
  console.log(`Wrote ${dots.length} dots to ${outputPath}`)
}

export function pseudoRandom(seed) {
  const value = Math.sin(seed) * 10000
  return value - Math.floor(value)
}
