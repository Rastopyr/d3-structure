
import { line as d3Line } from 'd3-shape';

import cond from 'ramda/src/cond';

const hasLine = ({ e: { id }, container }) => !!container.shapes.lines[id]

const createLine = ({ e: { line, id }, container }) =>
  container.shapes.lines[id] = Object.keys(line).reduce((l, k) => l[k](line[k]), d3Line())

const updateLine = ({ e: { line, id }, container }) =>
  Object.keys(line).reduce(
    (l, k) => l[k](line[k]), container.shapes.lines[id]
  );

export default cond([
  [(ev) => !!ev.e.line && hasLine(ev), updateLine],
  [(ev) => !!ev.e.line && !hasLine(ev), createLine],
]);
