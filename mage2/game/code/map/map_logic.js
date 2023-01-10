
"use strict";

function mapFindEdge(x, y, range) {
  const tx = Math.floor(x / 80.0);
  const ty = Math.floor(y / 80.0);
  const tr = Math.floor(range / (2.0*80.0));

  const minx = Math.max(0, tx - tr);
  const maxx = Math.min(mapBlueprint.x - 1, tx + tr);
  const miny = Math.max(1, ty - tr);
  const maxy = Math.min(mapBlueprint.y - 2, ty + tr);

  // select random tile
  for (var i = 0; i < 200; i++) {
    const sx = Math.floor(Math.random() * (maxx - minx + 1) + minx);
    const sy = Math.floor(Math.random() * (maxy - miny + 1) + miny);
    if(!mapIsTileBlocked(mapBlueprint.tiles, mapBlueprint.x, mapBlueprint.y, sx, sy)) {
      if (mapIsTileBlocked(mapBlueprint.tiles, mapBlueprint.x, mapBlueprint.y, sx, sy + 1) || mapIsTileBlocked(mapBlueprint.tiles, mapBlueprint.x, mapBlueprint.y, sx, sy - 1)) {
        return { cx: sx*80.0 + 40.0, cy: sy*80.0 + 40.0 };
      }
    }
  }
  return null;
}
