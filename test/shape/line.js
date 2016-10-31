
import { expect } from 'chai';
import { Subject } from 'rxjs';
import { selection, curveBasis, curveBasisClosed } from 'd3';

import d3Stream from '../../src';
import line from '../../src/selection/index';

describe('Shape Line', () => {
  it('signature', () => {
    expect(line).to.be.a('function');
  });

  describe('events', () => {
    it('should correct define values', () => {
      const lineId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        type: 'shape',
        shape: 'line',
        id: lineId,
        line: {
          x: Math.random(),
          y: Math.random(),
          defined: true,
          curve: curveBasis,
          context: true,
        }
      };

      s.dispatch(event);

      const savedLine = s.container.shapes.lines[lineId];

      expect(savedLine.x()()).to.be.equal(event.line.x);
      expect(savedLine.y()()).to.be.equal(event.line.y);
      expect(savedLine.curve()).to.be.equal(event.line.curve);
      expect(savedLine.context()).to.be.equal(event.line.context);
    });

    it('should correct update values', () => {
      const lineId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        type: 'shape',
        shape: 'line',
        id: lineId,
        line: {
          x: Math.random(),
          y: Math.random(),
          defined: true,
          curve: curveBasis,
          context: true,
        }
      };

      const updateEvent = {
        type: 'shape',
        shape: 'line',
        id: lineId,
        line: {
          x: Math.random(),
          y: Math.random(),
          defined: true,
          curve: curveBasisClosed,
          context: true,
        },
      };

      s.dispatch(event);
      s.dispatch(updateEvent);

      const savedLine = s.container.shapes.lines[lineId];

      expect(savedLine.x()()).to.be.equal(updateEvent.line.x);
      expect(savedLine.y()()).to.be.equal(updateEvent.line.y);
      expect(savedLine.curve()).to.be.equal(updateEvent.line.curve);
      expect(savedLine.context()).to.be.equal(updateEvent.line.context);
    });
  });
});
