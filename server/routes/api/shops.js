const Shops = require('../../models/Shops');
const shopUtils = require('../../utils/shops');
//auto
// const autorizUtils = require('../../utils/autorization');

module.exports = (app) => {
  // auto autorizUtils.requiresLogin,
  // app.post('/api/shops', autorizUtils.requiresLogin, (req, res, next) => {

  app.post('/api/shops', (req, res, next) => {
    let {filters = [], sorting = [], search = []} = req.body;
    const condition = {};

    // all conditions filters and search are combined by AND
    if (filters.length > 0) {
      if(!condition.$and) {
        condition.$and = [];
      }
      const filterConditions = shopUtils.getFilterConditions(filters);
      condition.$and.push(filterConditions);
    }

    if (search.length > 0) {
      if(!condition.$and) {
        condition.$and = [];
      }
      const searchConditions = shopUtils.getSearchConditions(search);
      condition.$and.push(searchConditions);
    }

    Shops.find(condition)
      .exec()
      .then((shops) => {
        let orderedShops = shops;
        // add order to all shops from request params or as is
        if (sorting.length >= 0) {
          // order sorting field
          orderedShops = shopUtils.sortShops(sorting, orderedShops);
        }
        res.json(orderedShops);
      })
      .catch((err) => next(err));
  });

  app.get('/api/shops/filters', (req, res, next) => {
    let fields = [];

    try {
      fields = shopUtils.getShopFieldsByType('Number');
    } catch(err) {
      console.log(err.message);
    }

    res.send(fields);
  });

  app.get('/api/shops/search', (req, res, next) => {
    let fields = [];

    try {
      fields = shopUtils.getShopFieldsByType('String');
    } catch(err) {
      console.log(err.message);
    }

    res.send(fields);
  });

  app.get('/api/shops/sorting', (req, res, next) => {
    let fields = [];

    try {
      fields = shopUtils.getAllShopFields();
    } catch(err) {
      console.log(err.message);
    }

    res.send(fields);
  });
};
