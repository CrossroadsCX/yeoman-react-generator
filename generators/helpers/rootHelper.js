const buildReducer = (modules) => {
  let moduleReducerCombinationBlock = '';
  let moduleReducerImportBlock = '';

  modules.forEach((module) => {
    moduleReducerCombinationBlock += `${module},\n`;
    moduleReducerImportBlock += `import ${module} from '../${module}/reducer';\n`;
  });

  return {
    moduleReducerCombinationBlock,
    moduleReducerImportBlock,
  };
};

module.exports = {
  buildReducer,
};
