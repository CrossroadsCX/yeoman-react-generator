/* global describe, expect, it */
/* eslint-disable no-multi-str */

const {
  rootHelper,
} = require('../generators/helpers');

describe('Root Helper', () => {
  it('Should have the correct methods', () => {
    expect(rootHelper.buildReducer).toBeDefined();
    expect(rootHelper.buildSaga).toBeDefined();
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

    expect(moduleReducerCombinationBlock).toBe('auth,\n  users,');
  });

  it('Should build the saga import block correctly', () => {
    const {
      moduleSagaImportBlock,
    } = rootHelper.buildSaga(['auth', 'users']);

    expect(moduleSagaImportBlock).toBe('import auth from \'../auth/sagas\';\nimport users from \'../users/sagas\';\n');
  });

  it('Should build the saga combination block correctly', () => {
    const {
      moduleSagaCombinationBlock,
    } = rootHelper.buildSaga(['auth', 'users']);

    expect(moduleSagaCombinationBlock).toBe('    auth(),\n    users(),');
  });
});
