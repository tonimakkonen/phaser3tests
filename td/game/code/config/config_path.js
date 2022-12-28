
"use strict"

const PATH_SMOOTH = 50

const PATH_DEF = []

PATH_DEF.push({x: 0.8, y: -0.1})
PATH_DEF.push({x: 0.9, y: 0.1})
PATH_DEF.push({x: 0.3, y: 0.4})
PATH_DEF.push({x: 0.5, y: 0.6})
PATH_DEF.push({x: 0.5, y: 1.1})

// Calculate reaL path

const PATH_REAL = [{x: PATH_DEF[0].x*CONFIG_WIDTH, y: PATH_DEF[0].y*CONFIG_HEIGHT, dist: 0}]
for (var index = 1; index < PATH_DEF.length; index++) {
  const x1 = PATH_DEF[index].x*CONFIG_WIDTH
  const y1 = PATH_DEF[index].y*CONFIG_HEIGHT
  const dx = x1 - PATH_REAL[index - 1].x
  const dy = y1 - PATH_REAL[index - 1].y
  const dist = PATH_REAL[index - 1].dist + Math.sqrt(dx*dx + dy*dy)
  PATH_REAL.push({x: x1, y: y1, dist: dist})
}

const PATH_TOTAL_DIST = PATH_REAL[PATH_REAL.length - 1].dist

function pathGetExact(dist) {
  if (dist <= 0) return { x: PATH_REAL[0].x, y: PATH_REAL[0].y }
  if (dist >= PATH_TOTAL_DIST) return { x: PATH_REAL[PATH_REAL.length - 1].x, y: PATH_REAL[PATH_REAL.length - 1].y }
  for (var index = 0; index < PATH_REAL.length - 1; index++) {
    const p0 = PATH_REAL[index]
    const p1 = PATH_REAL[index + 1]
    if (p0.dist <= dist && dist <= p1.dist) {
      const t = (dist - p0.dist) / (p1.dist - p0.dist)
      const x = p0.x * (1 - t) + p1.x * t
      const y = p0.y * (1 - t) + p1.y * t
      return { x: x, y: y }
    }
  }
}

function pathGetSmooth(dist) {
  const pa = pathGetExact(dist - PATH_SMOOTH)
  const pb = pathGetExact(dist + PATH_SMOOTH)
  const x = (pa.x + pb.x) / 2
  const y = (pa.y + pb.y) / 2
  return { x: x, y: y }
}
