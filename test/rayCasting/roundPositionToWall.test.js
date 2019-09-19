import assert from 'assert';
import roundPositionToWall from '../../src/rayCasting/roundPositionToWall';

describe('rayCasting.roundPositionToWall', function () {
  it('1.5 positif should give 2', function () {
    // Given
    const value = 1.5;
    const isPositif = true;

    // When
    const result = roundPositionToWall(value, isPositif);

    // Then
    assert.strictEqual(result, 2);
  });
  it('1.5 negatif should give 2', function () {
    // Given
    const value = 1.5;
    const isPositif = false;

    // When
    const result = roundPositionToWall(value, isPositif);

    // Then
    assert.strictEqual(result, 1);
  });
  it('1 negatif should give 1', function () {
    // Given
    const value = 1;
    const isPositif = false;

    // When
    const result = roundPositionToWall(value, isPositif);

    // Then
    assert.strictEqual(result, 1);
  });
  it('1 positif should give 1', function () {
    // Given
    const value = 1;
    const isPositif = true;

    // When
    const result = roundPositionToWall(value, isPositif);

    // Then
    assert.strictEqual(result, 1);
  });
});