const buildReducer = (modules) => {
  let moduleReducerCombinationBlock = '';
  let moduleReducerImportBlock = '';

  modules.forEach((module) => {
    moduleReducerCombinationBlock += `  ${module},\n`;
    moduleReducerImportBlock += `import ${module} from '../${module}/reducer';\n`;
  });

  moduleReducerCombinationBlock = moduleReducerCombinationBlock.trim();

  return {
    moduleReducerCombinationBlock,
    moduleReducerImportBlock,
  };
};

const buildSaga = (modules) => {
  let moduleSagaCombinationBlock = '';
  let moduleSagaImportBlock = '';

  modules.forEach((module) => {
    moduleSagaCombinationBlock += `    ${module}(),\n`;
    moduleSagaImportBlock += `import ${module} from '../${module}/sagas';\n`;
  });

  moduleSagaCombinationBlock = moduleSagaCombinationBlock.replace(/\s+$/, '');

  return {
    moduleSagaCombinationBlock,
    moduleSagaImportBlock,
  };
};

module.exports = {
  buildReducer,
  buildSaga,
};
