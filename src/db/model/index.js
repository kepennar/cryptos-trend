const { productModel, defaultData } = require('./product');

module.exports = {
  productModel,
  defaultDatas: {
    ...defaultData
  }
};
