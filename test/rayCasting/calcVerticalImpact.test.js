import assert from 'assert';
import almostEqual from 'almost-equal';

import { getWallXFromY } from '../../src/rayCasting/calcVerticalImpact';
import calcVerticalImpact from '../../src/rayCasting/calcVerticalImpact';

import * as angleUtils from '../../src/angleUtils';
import * as TileType from '../../src/TileType';
import World from '../../src/World';
import centralPillar from '../../src/maps/central-pillar';

describe('rayCasting.calcVerticalImpact', function () {
  describe('getWallXFromY', function () {
    describe('facing up', function () {
      describe('normal', function () {
        [{
          sourceY: 1,
          sourceX: 1,
          wallY: 2,
          angle: 0.5 * Math.PI,
          expected: 1,
        }, {
          sourceY: 1,
          sourceX: 3,
          wallY: 2,
          angle: 0.5 * Math.PI,
          expected: 3,
        }, {
          // going top-left
          sourceY: 1,
          sourceX: 3,
          wallY: 2,
          angle: 0.75 * Math.PI,
          expected: 2,
        }, {
          // going top-right
          sourceY: 1,
          sourceX: 3,
          wallY: 2,
          angle: 0.25 * Math.PI,
          expected: 4,
        }].forEach(generateTest);
      });
      describe('touching wall', function () {
        [{
          sourceY: 1,
          sourceX: 3,
          wallY: 1,
          angle: 0.5 * Math.PI,
          expected: 3,
        }, {
          // facing top-left
          sourceY: 1,
          sourceX: 3,
          wallY: 1,
          angle: 0.75 * Math.PI,
          expected: 3,
        }, {
          // facing top-right
          sourceY: 1,
          sourceX: 3,
          wallY: 1,
          angle: 0.25 * Math.PI,
          expected: 3,
        }].forEach(generateTest);
      });
    });
    describe('facing down', function () {
      describe('normal', function () {
        [{
          sourceY: 2,
          sourceX: 1,
          wallY: 1,
          angle: 1.5 * Math.PI,
          expected: 1,
        }, {
          sourceY: 2,
          sourceX: 3,
          wallY: 1,
          angle: 1.5 * Math.PI,
          expected: 3,
        }, {
          // facing bottom-left
          sourceY: 2,
          sourceX: 3,
          wallY: 1,
          angle: 1.25 * Math.PI,
          expected: 2,
        }, {
          // facing bottom-right
          sourceY: 2,
          sourceX: 3,
          wallY: 1,
          angle: 1.75 * Math.PI,
          expected: 4,
        }].forEach(generateTest);
      });
      describe('touching wall', function () {
        [{
          sourceY: 2,
          sourceX: 3,
          wallY: 2,
          angle: 0.5 * Math.PI,
          expected: 3,
        }, {
          // facing bottom-right
          sourceY: 2,
          sourceX: 3,
          wallY: 2,
          angle: 1.75 * Math.PI,
          expected: 3,
        }, {
          // facing bottom-left
          sourceY: 2,
          sourceX: 3,
          wallY: 2,
          angle: 1.25 * Math.PI,
          expected: 3,
        }].forEach(generateTest);
      });
    });

    function generateTest({
      sourceY,
      sourceX,
      wallY,
      angle,
      expected
    }) {
      it(`\
      sourceY: ${sourceY}, sourceX: ${sourceX}, wallY: ${wallY}, \
angle: ${angleUtils.radiansToDegrees(angle)} -> ${expected}\
`, () => {
        // When
        const result = getWallXFromY(sourceY, sourceX, wallY, angle);

        // Then
        assert.ok(almostEqual(result, expected, 0, 0.0000001), `actual: ${result}, expected: ${expected}`);
      });
    }
  });
  describe('calcVerticalImpact', function () {
    describe('horizontal, result in null', function () {
      it('right', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 2.5;
        const sourceY = 1.5;
        const angle = 0;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('left', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 2.5;
        const sourceY = 1.5;
        const angle = Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('right, slightly up', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 2.5;
        const sourceY = 1.5;
        const angle = angleUtils.degreesToRadians(1);

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('right, slightly down', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 2.5;
        const sourceY = 1.5;
        const angle = angleUtils.degreesToRadians(359);

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('left, slightly up', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 2.5;
        const sourceY = 1.5;
        const angle = angleUtils.degreesToRadians(179);

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('left, slightly down', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 2.5;
        const sourceY = 1.5;
        const angle = angleUtils.degreesToRadians(181);

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
    });
    describe('going up', function () {
      it('angle: 0.5PI, 1 to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 2.5;
        const sourceY = 1;
        const angle = 0.5 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: 1,
          x: 2.5,
          y: 2,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
      it('angle: 0.5*PI, 0.5 to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 2.5;
        const sourceY = 0.5;
        const angle = 0.5 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: 1.5,
          x: 2.5,
          y: 2,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
      it('angle: 0.5*PI, outside the map', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 1.5;
        const angle = 0.5 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('angle: 0.5*PI, outside the map (first tile)', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 5.5;
        const angle = 0.5 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('angle: 0.25*PI to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 1;
        const angle = 0.25 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: Math.SQRT2,
          x: 2.5,
          y: 2,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
      it('angle: 0.75*PI to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 3.5;
        const sourceY = 1;
        const angle = 0.75 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: Math.SQRT2,
          x: 2.5,
          y: 2,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
    });
    describe('going down', function () {
      it('angle=1.5*PI, y=4 to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 2.5;
        const sourceY = 4;
        const angle = 1.5 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: 1,
          x: 2.5,
          y: 3,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
      it('angle=PI, x=4.5 to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 2.5;
        const sourceY = 4.5;
        const angle = 1.5 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: 1.5,
          x: 2.5,
          y: 3,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
      it('angle=1.5*PI, outside the map', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 4.5;
        const angle = 1.5 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('angle=1.5*PI, outside the map (first tile)', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 0.5;
        const angle = 1.5 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('angle: 1.75*PI to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 4;
        const angle = 1.75 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: Math.SQRT2,
          x: 2.5,
          y: 3,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
      it('angle: 1.25*PI to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 3.5;
        const sourceY = 4;
        const angle = 1.25 * Math.PI;

        // When
        const impact = calcVerticalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: Math.SQRT2,
          x: 2.5,
          y: 3,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
    });

    function checkImpact(impact, expectedImpact) {
      assert.strictEqual(impact.angle, expectedImpact.angle);
      assert.deepEqual(impact.target, expectedImpact.target);
      assert.ok(almostEqual(impact.distance, expectedImpact.distance, 0, 0.0000001),
        `distance, actual: ${impact.distance}, expected: ${expectedImpact.distance}`);
      assert.ok(almostEqual(impact.x, expectedImpact.x, 0, 0.0000001),
        `x, actual: ${impact.x}, expected: ${expectedImpact.x}`);
      assert.ok(almostEqual(impact.y, expectedImpact.y, 0, 0.0000001),
        `y, actual: ${impact.y}, expected: ${expectedImpact.y}`);
    }
  });
});
