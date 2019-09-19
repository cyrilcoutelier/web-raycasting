import assert from 'assert';
import * as angleUtils from '../src/angleUtils';
import { tsMappedType } from '@babel/types';

describe('angleUtils', function () {
  describe('normalizeAngle', function () {
    it('PI -> PI', function () {
      // Given
      const value = Math.PI;

      // When
      const result = angleUtils.normalizeAngle(value);

      // Then
      assert.strictEqual(result, Math.PI);
    });
    it('0 -> 0', function () {
      // Given
      const value = 0;

      // When
      const result = angleUtils.normalizeAngle(value);

      // Then
      assert.strictEqual(result, 0);
    });
    it('2PI -> 0', function () {
      // Given
      const value = 2 * Math.PI;

      // When
      const result = angleUtils.normalizeAngle(value);

      // Then
      assert.strictEqual(result, 0);
    });
    it('3PI -> PI', function () {
      // Given
      const value = 3 * Math.PI;

      // When
      const result = angleUtils.normalizeAngle(value);

      // Then
      assert.strictEqual(result, Math.PI);
    });
    it('-PI -> PI', function () {
      // Given
      const value = -Math.PI;

      // When
      const result = angleUtils.normalizeAngle(value);

      // Then
      assert.strictEqual(result, Math.PI);
    });
    it('-2 * PI -> 0', function () {
      // Given
      const value = -2 * Math.PI;

      // When
      const result = angleUtils.normalizeAngle(value);

      // Then
      assert.strictEqual(result, 0);
    });
    it('-3 * PI -> PI', function () {
      // Given
      const value = -3 * Math.PI;

      // When
      const result = angleUtils.normalizeAngle(value);

      // Then
      assert.strictEqual(result, Math.PI);
    });
  });
  describe('isVerticalPositif', function () {
    // Giben
    [{
      value: 0,
      expected: true,
    }, {
      value: 0.25,
      expected: true,
    }, {
      value: 0.5,
      expected: true,
    }, {
      value: 0.75,
      expected: true,
    }, {
      value: 1,
      expected: false,
    }, {
      value: 1.25,
      expected: false,
    }, {
      value: 1.5,
      expected: false,
    }, {
      value: 1.75,
      expected: false,
    }].forEach(({ value, expected }) => {
      it(`${value} * PI -> ${expected}`, function () {
        value *= Math.PI;
        // When
        const result = angleUtils.isVerticalPositif(value);

        // Then
        assert.strictEqual(result, expected);
      });
    });
  });
  describe('isHorizontalPositif', function () {
    // Giben
    [{
      value: 0,
      expected: true,
    }, {
      value: 0.25,
      expected: true,
    }, {
      value: 0.5,
      expected: true,
    }, {
      value: 0.75,
      expected: false,
    }, {
      value: 1,
      expected: false,
    }, {
      value: 1.25,
      expected: false,
    }, {
      value: 1.5,
      expected: false,
    }, {
      value: 1.75,
      expected: true,
    }].forEach(({ value, expected }) => {
      it(`${value} * PI -> ${expected}`, function () {
        value *= Math.PI;
        // When
        const result = angleUtils.isHorizontalPositif(value);

        // Then
        assert.strictEqual(result, expected);
      });
    });
  });
});
