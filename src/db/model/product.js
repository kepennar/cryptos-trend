const { throttleTime } = require('rxjs/operators/throttleTime');
const { filter } = require('rxjs/operators/filter');
const db = require('../index');
const { gdaxApi } = require('../../services');

const COLLECTION_NAME = 'products';
db.set(COLLECTION_NAME, []).write();
gdaxApi
  .getStream()
  .pipe(
    filter(message =>!!message && message.data && message.data.type === 'ticker'),
    throttleTime(1000)
  )
  .subscribe(({ data }) => {
    db
      .get(COLLECTION_NAME)
      .push(data)
      .write();
  });

class ProductModel {}

module.exports = {
  productModel: new ProductModel(),
  defaultData: { COLLECTION_NAME: [] }
};
