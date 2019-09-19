import assert from 'assert';

import World from '../src/World';
import * as TileType from '../src/TileType';

import centralPillar from '../src/maps/central-pillar';
import leftPillar from '../src/maps/left-pillar';
import upPillar from '../src/maps/up-pillar';
import rightPillar from '../src/maps/right-pillar';
import bottomPillar from '../src/maps/bottom-pillar';

describe('World', () => {
  describe('getTile', () => {
    it('central pillar', () => {
      // Given
      const x = 2;
      const y = 2;
      const world = new World(centralPillar);

      // When
      const tile = world.getTile(x, y);

      // Then
      const expected = {
        x,
        y,
        type: TileType.WALL,
      };
      assert.deepEqual(tile, expected);
    });
    it('left pillar', () => {
      // Given
      const x = 1;
      const y = 2;
      const world = new World(leftPillar);

      // When
      const tile = world.getTile(x, y);

      // Then
      const expected = {
        x,
        y,
        type: TileType.WALL,
      };
      assert.deepEqual(tile, expected);
    });
    it('right pillar', () => {
      // Given
      const x = 3;
      const y = 2;
      const world = new World(rightPillar);

      // When
      const tile = world.getTile(x, y);

      // Then
      const expected = {
        x,
        y,
        type: TileType.WALL,
      };
      assert.deepEqual(tile, expected);
    });
    it('up pillar', () => {
      // Given
      const x = 2;
      const y = 3;
      const world = new World(upPillar);

      // When
      const tile = world.getTile(x, y);

      // Then
      const expected = {
        x,
        y,
        type: TileType.WALL,
      };
      assert.deepEqual(tile, expected);
    });
    it('bottom pillar', () => {
      // Given
      const x = 2;
      const y = 1;
      const world = new World(bottomPillar);

      // When
      const tile = world.getTile(x, y);

      // Then
      const expected = {
        x,
        y,
        type: TileType.WALL,
      };
      assert.deepEqual(tile, expected);
    });
  });
});
