import assert from 'assert';
import almostEqual from 'almost-equal';

import { getWallYFromX } from '../../src/rayCasting/calcHorizontalImpact';
import calcHorizontalImpact from '../../src/rayCasting/calcHorizontalImpact';

import * as angleUtils from '../../src/angleUtils';
import * as TileType from '../../src/TileType';
import World from '../../src/World';
import centralPillar from '../../src/maps/central-pillar';

describe('rayCasting.calcHorizontalImpact', function () {
  describe('getWallYFromX', function () {
    describe('facing right', function () {
      describe('normal', function () {
        [{
          sourceX: 1,
          sourceY: 1,
          wallX: 2,
          angle: 0,
          expected: 1,
        }, {
          sourceX: 1,
          sourceY: 3,
          wallX: 2,
          angle: 0,
          expected: 3,
        }, {
          // going right-up
          sourceX: 1,
          sourceY: 3,
          wallX: 2,
          angle: Math.PI * 0.25,
          expected: 4,
        }, {
          // going right-down
          sourceX: 1,
          sourceY: 3,
          wallX: 2,
          angle: Math.PI * 1.75,
          expected: 2,
        }].forEach(generateTest);
      });
      describe('touching wall', function () {
        [{
          sourceX: 1,
          sourceY: 3,
          wallX: 1,
          angle: 0,
          expected: 3,
        }, {
          // going right-up
          sourceX: 1,
          sourceY: 3,
          wallX: 1,
          angle: Math.PI * 0.25,
          expected: 3,
        }, {
          // goint right-down
          sourceX: 1,
          sourceY: 3,
          wallX: 1,
          angle: Math.PI * 1.75,
          expected: 3,
        }].forEach(generateTest);
      });
    });
    describe('facing left', function () {
      describe('normal', function () {
        [{
          sourceX: 2,
          sourceY: 1,
          wallX: 1,
          angle: Math.PI,
          expected: 1,
        }, {
          sourceX: 2,
          sourceY: 3,
          wallX: 1,
          angle: Math.PI,
          expected: 3,
        }, {
          sourceX: 2,
          sourceY: 3,
          wallX: 1,
          angle: Math.PI * 0.75,
          expected: 4,
        }, {
          sourceX: 2,
          sourceY: 3,
          wallX: 1,
          angle: Math.PI * 1.25,
          expected: 2,
        }].forEach(generateTest);
      });
      describe('touching wall', function () {
        [{
          sourceX: 1,
          sourceY: 3,
          wallX: 1,
          angle: Math.PI,
          expected: 3,
        }, {
          // going left-up
          sourceX: 1,
          sourceY: 3,
          wallX: 1,
          angle: Math.PI * 0.75,
          expected: 3,
        }, {
          // going left-down
          sourceX: 1,
          sourceY: 3,
          wallX: 1,
          angle: Math.PI * 1.25,
          expected: 3,
        }].forEach(generateTest);
      });
    });

    function generateTest({
      sourceX,
      sourceY,
      wallX,
      angle,
      expected
    }) {
      it(`\
sourceX: ${sourceX}, sourceY: ${sourceY}, wallX: ${wallX}, \
angle: ${angleUtils.radiansToDegrees(angle)} -> ${expected}\
`, () => {
        // When
        const result = getWallYFromX(sourceX, sourceY, wallX, angle);

        // Then
        assert.ok(almostEqual(result, expected, 0, 0.0000001), `actual: ${result}, expected: ${expected}`);
      });
    }
  });
  describe('calcHorizontalImpact', function () {
    describe('vertical, result in null', function () {
      it('up', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 2.5;
        const angle = 0.5 * Math.PI;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('down', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 2.5;
        const angle = 1.5 * Math.PI;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('up, slightly to the right', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 2.5;
        const angle = angleUtils.degreesToRadians(89);

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('up, slightly to the left', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 2.5;
        const angle = angleUtils.degreesToRadians(91);

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('bottom, slightly to the right', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 2.5;
        const angle = angleUtils.degreesToRadians(180 + 89);

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('bottom, slightly to the left', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1.5;
        const sourceY = 2.5;
        const angle = angleUtils.degreesToRadians(180 + 91);

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
    });
    describe('going right', function () {
      it('angle: 0, 1 to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1;
        const sourceY = 2.5;
        const angle = 0;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: 1,
          x: 2,
          y: 2.5,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
      it('angle: 0, 0.5 to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 0.5;
        const sourceY = 2.5;
        const angle = 0;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: 1.5,
          x: 2,
          y: 2.5,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
      it('angle: 0, outside the map', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 0.5;
        const sourceY = 1.5;
        const angle = 0;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('angle: 0, outside the map (first tile)', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 4.5;
        const sourceY = 1.5;
        const angle = 0;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('angle: 0.25*PI to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1;
        const sourceY = 1.5;
        const angle = 0.25 * Math.PI;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: Math.SQRT2,
          x: 2,
          y: 2.5,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
      it('angle: 1.75*PI to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 1;
        const sourceY = 3.5;
        const angle = 1.75 * Math.PI;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: Math.SQRT2,
          x: 2,
          y: 2.5,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
    });
    describe('going left', function () {
      it('angle=PI, x=4 to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 4;
        const sourceY = 2.5;
        const angle = Math.PI;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: 1,
          x: 3,
          y: 2.5,
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
        const sourceX = 4.5;
        const sourceY = 2.5;
        const angle = Math.PI;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: 1.5,
          x: 3,
          y: 2.5,
          target: {
            type: TileType.WALL,
            x: 2,
            y: 2,
          },
        };
        checkImpact(impact, expectedImpact);
      });
      it('angle=PI, outside the map', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 4.5;
        const sourceY = 1.5;
        const angle = Math.PI;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('angle=PI, outside the map (first tile)', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 0.5;
        const sourceY = 1.5;
        const angle = Math.PI;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        assert.strictEqual(impact, null);
      });
      it('angle: 0.75*PI to wall', function () {
        // Given
        const world = new World(centralPillar);
        const sourceX = 4;
        const sourceY = 1.5;
        const angle = 0.75 * Math.PI;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: Math.SQRT2,
          x: 3,
          y: 2.5,
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
        const sourceX = 4;
        const sourceY = 3.5;
        const angle = 1.25 * Math.PI;

        // When
        const impact = calcHorizontalImpact(world, sourceX, sourceY, angle);

        // Then
        const expectedImpact = {
          angle,
          distance: Math.SQRT2,
          x: 3,
          y: 2.5,
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
