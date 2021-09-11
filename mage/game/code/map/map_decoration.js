
"use strict";

function mapHandleDecoration(game, deco, px, py, list) {
  // TODO: Handle animations and similar (if needed)
  // TODO: Depth
  const graph = GRAPHS.get(deco.graph);
  if (!graph) throw 'Unkown graph for decoration: ' + deco.graph;
  const cx = (px + 0.5) * 80.0;
  const cy = (py + 0.5) * 80.0;

  const im = game.add.image(cx, cy, graph.name);
  im.setDepth(deco.z);
  list.push(im);
}