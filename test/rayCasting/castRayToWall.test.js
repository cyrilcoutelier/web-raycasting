import assert from 'assert';
import almostEqual from 'almost-equal';

import castRayToWall from '../../src/rayCasting/castRayToWall';

import World from '../../src/World';
import centralPillar from '../../src/maps/central-pillar';
import * as TileType from '../../src/TileType';
import cercledPillar from '../../src/maps/cercled-pillar';

describe('rayCasting.castRayToWall', function () {
  it('going out of map', function () {
    // Given
    const world = new World(centralPillar);
    const sourceX = 3.5;
    const sourceY = 3.5;
    const angle = 0.25 * Math.PI;

    // When
    const impact = castRayToWall(world, sourceX, sourceY, angle);

    // Then
    assert.strictEqual(impact, null);
  });
  it('going up-right, to left face', function () {
    // Given
    const world = new World(centralPillar);
    const sourceX = 1;
    const sourceY = 1.5;
    const angle = 0.25 * Math.PI;

    // When
    const impact = castRayToWall(world, sourceX, sourceY, angle);

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
  it('going up-right, to bottom face', function () {
    // Given
    const world = new World(centralPillar);
    const sourceX = 1.5;
    const sourceY = 1;
    const angle = 0.25 * Math.PI;

    // When
    const impact = castRayToWall(world, sourceX, sourceY, angle);

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
  it('going down-left, to right face', function () {
    // Given
    const world = new World(centralPillar);
    const sourceX = 4;
    const sourceY = 3.5;
    const angle = 1.25 * Math.PI;

    // When
    const impact = castRayToWall(world, sourceX, sourceY, angle);

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
  it('going down-left, to top face', function () {
    // Given
    const world = new World(centralPillar);
    const sourceX = 3.5;
    const sourceY = 4;
    const angle = 1.25 * Math.PI;

    // When
    const impact = castRayToWall(world, sourceX, sourceY, angle);

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
  it('impact horizontal first', function () {
    // Given
    const world = new World(cercledPillar);
    const sourceX = 2;
    const sourceY = 1.5;
    const angle = 0.25 * Math.PI;

    // When
    const impact = castRayToWall(world, sourceX, sourceY, angle);

    // Then
    const expectedImpact = {
      angle,
      distance: Math.SQRT2 / 2,
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
  it('impact vertical first', function () {
    // Given
    const world = new World(cercledPillar);
    const sourceX = 1.5;
    const sourceY = 2;
    const angle = 0.25 * Math.PI;

    // When
    const impact = castRayToWall(world, sourceX, sourceY, angle);

    // Then
    const expectedImpact = {
      angle,
      distance: Math.SQRT2 / 2,
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
