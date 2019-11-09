import assert from 'assert';
import almostEqual from 'almost-equal';

import castRayToObject from '../../src/rayCasting/castRayToObject';

describe('rayCasting.castRayToObject', function () {
  it('impact center of object (looking up)', function () {
    // Given
    const object = {
      x: 2,
      y: 2,
      width: 0.5,
    };
    const x = 1;
    const y = 1;
    const rayAngle = Math.PI / 4;

    // When
    const impact = castRayToObject(object, x, y, rayAngle);
    
    // Then
    const expected = {
      distance: Math.SQRT2,
      x: 2,
      y: 2,
      target: object,
    };
    checkImpact(impact, expected);
  });

  it('impact center of object (looking down)', function () {
    // Given
    const object = {
      x: 2,
      y: 2,
      width: 0.5,
    };
    const x = 1;
    const y = 3;
    const rayAngle = 7 * Math.PI / 4;

    // When
    const impact = castRayToObject(object, x, y, rayAngle);
    
    // Then
    const expected = {
      distance: Math.SQRT2,
      x: 2,
      y: 2,
      target: object,
    };
    checkImpact(impact, expected);
  });

  function checkImpact(impact, expectedImpact) {
    // assert.strictEqual(impact.angle, expectedImpact.angle);
    assert.deepEqual(impact.target, expectedImpact.target);
    assert.ok(almostEqual(impact.distance, expectedImpact.distance, 0, 0.0000001),
      `distance, actual: ${impact.distance}, expected: ${expectedImpact.distance}`);
    assert.ok(almostEqual(impact.x, expectedImpact.x, 0, 0.0000001),
      `x, actual: ${impact.x}, expected: ${expectedImpact.x}`);
    assert.ok(almostEqual(impact.y, expectedImpact.y, 0, 0.0000001),
      `y, actual: ${impact.y}, expected: ${expectedImpact.y}`);
  }
});
