const ShopsSchema = require('../models/Shops');
const orderBy = require('lodash/orderBy');
const map = require('lodash/map');

const getAllShopFields =  () => {
  const allKeys = Object.keys(ShopsSchema.schema.paths);
  let result = [];
  if (allKeys.length <=0 ) {
    return result;
  }
  const paths = ShopsSchema.schema.paths;

  allKeys.forEach((key) => {
    if (paths[key].path !== '__v' && paths[key].path !== '_id') {
      result.push({name: paths[key].path, type: paths[key].instance});
    }
  });

  return result;
}

const getShopFieldsByType = (type = 'Number') => {
  const allKeys = Object.keys(ShopsSchema.schema.paths);
  let result = [];

  if (allKeys.length <=0 ) {
    return result;
  }

  const allFields = getAllShopFields();
  const capitalizeType = type.charAt(0).toUpperCase() + type.slice(1)

  allFields.forEach((field) => {
    if (field.type === capitalizeType) {
      result.push(field);
    }
  });

  return result;
}

const getFilterConditions = (filters = []) => {
  // TODO: add $in to map if it will be need
  const conditionMap = {
    '<': '$lt',
    '>': '$gt',
    '<=': '$lte',
    '>=': '$gte',
    '==': '$eq',
    '!=': '$ne'
  }

  let result = {$and: []};
  filters.map((filter) => {
    result.$and.push({[filter.field]: {[conditionMap[filter.condition]]: filter.value}});
  });

  if (result.$and.length <=0) {
    result = {};
  }
  return result;
}

const getSearchConditions = (search = []) => {
  let result = {$and: []};

  search.map((condition) => {
    result.$and.push({[condition.field]: {$regex: new RegExp(condition.value, "g")}});
  });

  if (result.$and.length <=0) {
    result = {};
  }
  return result;
}

const sortShops = (sorting = [], shops = []) => {
  const ordering = orderBy(sorting, 'ordering', 'asc');
  const fields = map(ordering, 'field');
  const directions = map(ordering, 'direction');
  const sortedShops = orderBy(shops, fields, directions);

  return sortedShops;
}

module.exports = {
  getAllShopFields,
  getShopFieldsByType,
  getFilterConditions,
  getSearchConditions,
  sortShops
};
