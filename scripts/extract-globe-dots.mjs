import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import {
  getPathCentroid,
  pseudoRandom,
  VIEWBOX_SIZE,
  writeDotsFile,
} from "./lib/svg-dot-utils.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, "..")

const SVG_PATH = join(rootDir, "public/images/used-by/pixel-globe.svg")
const OUTPUT_PATH = join(rootDir, "src/assets/pixel-globe-dots.json")

const VIEWBOX_CENTER = VIEWBOX_SIZE / 2
const CHUNK_GRID_SIZE = 7
const TWINKLE_MAX_DELAY_SECONDS = 7
const TWINKLE_MIN_DURATION_SECONDS = 2.8
const TWINKLE_MAX_DURATION_SECONDS = 7

function getChunkId(x, y) {
  const column = Math.min(
    CHUNK_GRID_SIZE - 1,
    Math.floor((x / VIEWBOX_SIZE) * CHUNK_GRID_SIZE),
  )
  const row = Math.min(
    CHUNK_GRID_SIZE - 1,
    Math.floor((y / VIEWBOX_SIZE) * CHUNK_GRID_SIZE),
  )

  return row * CHUNK_GRID_SIZE + column
}

function getChunkTiming(chunkId) {
  const delaySeed = pseudoRandom(chunkId * 91.173 + 13.7)
  const durationSeed = pseudoRandom(chunkId * 43.821 + 29.4)
  const stutterSeed = pseudoRandom(chunkId * 17.531 + 51.2)

  return {
    phase: Number((delaySeed * TWINKLE_MAX_DELAY_SECONDS).toFixed(3)),
    duration: Number(
      (
        TWINKLE_MIN_DURATION_SECONDS +
        durationSeed * (TWINKLE_MAX_DURATION_SECONDS - TWINKLE_MIN_DURATION_SECONDS)
      ).toFixed(3),
    ),
    stutter: stutterSeed > 0.5,
  }
}

function extractGlobeDots() {
  const svg = readFileSync(SVG_PATH, "utf8")
  const pathPattern = /<path d="([^"]+)"/g
  const dots = []

  for (const match of svg.matchAll(pathPattern)) {
    const { x, y } = getPathCentroid(match[1], VIEWBOX_CENTER)
    const chunkId = getChunkId(x, y)
    const { phase, duration, stutter } = getChunkTiming(chunkId)
    dots.push({
      x,
      y,
      phase,
      duration,
      stutter,
    })
  }

  writeDotsFile(OUTPUT_PATH, dots)
}

extractGlobeDots()
