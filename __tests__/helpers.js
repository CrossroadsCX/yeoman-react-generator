/* global describe, expect, it */
/* eslint-disable no-multi-str */

const {
  rootHelper,
} = require('../generators/helpers');

describe('Root Helper', () => {
  it('Should have the correct methods', () => {
    expect(rootHelper.buildReducer).toBeDefined();
  });

  it('Should build the reducer import block correctly', () => {
    const {
      moduleReducerImportBlock,
    } = rootHelper.buildReducer(['auth', 'users']);

    expect(moduleReducerImportBlock).toBe('import auth from \'../auth/reducer\';\nimport users from \'../users/reducer\';\n');
  });

  it('Should build the reducer combination block correctly', () => {
    const {
      moduleReducerCombinationBlock,
    } = rootHelper.buildReducer(['auth', 'users']);

    expect(moduleReducerCombinationBlock).toBe('auth,\nusers,\n');
  });
});
