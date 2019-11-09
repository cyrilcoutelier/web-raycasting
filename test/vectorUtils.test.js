import assert from 'assert';
import almostEqual from 'almost-equal';

import * as vectorUtils from '../src/vectorUtils';

describe('vectorUtils', function () {
  describe('getNorm', function () {
    // Given
    [{
      x: 0,
      y: 0,
      expected: 0,
    }, {
      x: 1,
      y: 0,
      expected: 1,
    }, {
      x: -1,
      y: 0,
      expected: 1,
    }, {
      x: 0,
      y: 2,
      expected: 2,
    }, {
      x: 0,
      y: -2,
      expected: 2,
    }, {
      x: 1,
      y: 1,
      expected: Math.SQRT2,
    }, {
      x: 2,
      y: -2,
      expected: Math.SQRT2 * 2,
    }, {
      x: -2,
      y: 2,
      expected: Math.SQRT2 * 2,
    }, {
      x: -2,
      y: -2,
      expected: Math.SQRT2 * 2,
    }].forEach(({ x, y, expected }) => {
      it(`getNorm({x: ${x}, y: ${y}}) == ${expected}`, () => {
        // When
        const vec = { x, y };
        const result = vectorUtils.getNorm(vec);

        // Then
        assert.strictEqual(result, expected);
      });
    });
  });
  describe('normalize', function () {
    // Given
    [{
      vec: {
        x: 0.5,
        y: 0,
      },
      expected: {
        x: 1,
        y: 0,
      },
    }, {
      vec: {
        x: 2,
        y: 0,
      },
      expected: {
        x: 1,
        y: 0,
      },
    }, {
      vec: {
        x: 0,
        y: -2,
      },
      expected: {
        x: 0,
        y: -1,
      },
    }, {
      vec: {
        x: 0,
        y: -0.5,
      },
      expected: {
        x: 0,
        y: -1,
      },
    }, {
      vec: {
        x: 1,
        y: 1,
      },
      expected: {
        x: Math.SQRT2 / 2,
        y: Math.SQRT2 / 2,
      },
    }].forEach(({ vec, expected }) => {
      it(`normalize({x: ${vec.x}, y: ${vec.y}}) == {x: ${expected.x}, y: ${expected.y}}`, () => {
        // When
        const result = vectorUtils.normalize(vec);

        // Then
        assert.ok(almostEqual(result.x, expected.x, 0.0000001),
          `x, actual: ${result.x}, expected: ${expected.x}`);
        assert.ok(almostEqual(result.y, expected.y, 0.0000001),
          `y, actual: ${result.y}, expected: ${expected.y}`);
      });
    });
  });

  describe('getDiff', function () {
    // Given
    [{
      from: {
        x: 0,
        y: 0,
      },
      to: {
        x: 0,
        y: 0,
      },
      expected: {
        x: 0,
        y: 0,
      },
    }, {
      from: {
        x: -1,
        y: -1,
      },
      to: {
        x: 0,
        y: 0,
      },
      expected: {
        x: 1,
        y: 1,
      },
    }, {
      from: {
        x: 1,
        y: -2,
      },
      to: {
        x: -1,
        y: 2,
      },
      expected: {
        x: -2,
        y: 4,
      },
    }].forEach(({ from, to, expected }) => {
      it(`getDiff(from{x: ${from.x}, y: ${from.y}}, \
to{x: ${to.x}, y: ${to.y}}) == {x: ${expected.x}, y: ${expected.y}}`, () => {
        // When
        const result = vectorUtils.getDiff(from, to);

        // Then
        assert.deepEqual(result, expected);
      });
    });
  });
  describe('getAngle', function () {
    // Given
    [{
      x: 2,
      y: 0,
      expected: 0,
    }, {
      x: 1,
      y: 0,
      expected: 0,
    }, {
      x: -2,
      y: 0,
      expected: 1,
    }, {
      x: 0,
      y: 1,
      expected: 0.5,
    }, {
      x: 0,
      y: -3,
      expected: 1.5,
    }, {
      x: 1,
      y: 1,
      expected: 0.25,
    }, {
      x: -1,
      y: 1,
      expected: 0.75,
    }, {
      x: -1,
      y: -1,
      expected: 1.25,
    }, {
      x: 1,
      y: -1,
      expected: 1.75,
    }, {
      x: -2,
      y: 2,
      expected: 0.75,
    }].forEach(({ x, y, expected }) => {
      it(`getAngle({x: ${x}, y: ${y}}) == ${expected} * PI`, () => {
        // When
        const vec = { x, y };
        debugger;
        const result = vectorUtils.getAngle(vec);

        // Then
        expected *= Math.PI;

        assert.ok(almostEqual(result, expected, 0.0000001),
          `angle, actual: ${result}, expected: ${expected}`);
      });
    });
  });
  describe('getLinesIntersection', function () {
    // Given
    [{
      leftPos: {
        x: 1,
        y: 1,
      },
      leftVec: {
        x: 0,
        y: 0.5,
      },
      rightPos: {
        x: 2,
        y: 2,
      },
      rightVec: {
        x: -0.5,
        y: 0,
      },
      expected: {
        x: 1,
        y: 2,
      },
    }, {
      leftPos: {
        x: 1,
        y: 1,
      },
      leftVec: {
        x: 3,
        y: 3,
      },
      rightPos: {
        x: 4,
        y: 1,
      },
      rightVec: {
        x: -3,
        y: 3,
      },
      expected: {
        x: 2.5,
        y: 2.5,
      },
    }, {
      leftPos: {
        x: 1,
        y: 1,
      },
      leftVec: {
        x: 3,
        y: 3,
      },
      rightPos: {
        x: 3,
        y: 1,
      },
      rightVec: {
        x: -3,
        y: 3,
      },
      expected: {
        x: 2,
        y: 2,
      },
    }, {
      leftPos: {
        x: 1,
        y: 1,
      },
      leftVec: {
        x: 3,
        y: 3,
      },
      rightPos: {
        x: 3,
        y: 1,
      },
      rightVec: {
        x: 3,
        y: 3,
      },
      expected: null,
    }].forEach(({ leftPos, leftVec, rightPos, rightVec, expected }) => {
      let title = `getLinesIntersection(leftPos{x: ${leftPos.x}, y: ${leftPos.y}}, \
leftVec{x: ${leftVec.x}, y: ${leftVec.y}}, \
rightPos{x: ${rightPos.x}, y: ${rightPos.y}}, \
rightVec{x: ${rightVec.x}, y: ${rightVec.y}}) == `;
      if (expected) {
        title += `{x: ${expected.x}, y: ${expected.y}}`;
      } else {
        title += 'null';
      }
      it(title, () => {
        // When
        const result = vectorUtils.getLinesIntersection(leftPos, leftVec, rightPos, rightVec);

        // Then
        assert.deepEqual(result, expected);
      });
    });
  });
});
