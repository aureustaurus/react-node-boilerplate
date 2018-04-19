const mongoose = require('mongoose');
const config = require('../config/config');
const argv = require('yargs').argv;

mongoose.connect(config.db_dev);
mongoose.Promise = global.Promise;

const Shops = require('./models/Shops');

const createString = () => {
  var text = '';
  var possible = ' _!ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

const createShop = (index) => {
  const result = {};

  result.name = `name${index}`;
  result.fieldNumber1 = Math.floor(Math.random() * 11);;
  result.fieldFloat1 = Math.floor(Math.random() * 10);
  result.fieldString1 = createString();
  result.fieldDate1 = new Date();
  result.fieldBoolean1 = true;
  result.fieldNumber2 = Math.floor(Math.random() * 12);
  result.fieldFloat2 = Math.floor(Math.random() * 15);
  result.fieldString2 = createString();
  result.fieldDate2 = new Date();
  result.fieldBoolean2 = false;

  return result;
};

const insert = (index) => {
  return new Promise((resolve, reject) => {
    const shop = createShop(index);

    Shops.create(shop)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log('insert error:', err.message);
        reject(err.message);
      });
  });
};


const main = () => {
  console.log('initdb is started');
  const rowAmount = argv.rows ? argv.rows : 20;
	let resultArray = [];

	for (let i = 0; i < rowAmount; i++) {
    const prom = insert(i);
		resultArray.push(prom);
	}

  Promise.all(resultArray)
    .then(() => {
      console.log(`${resultArray.length} documents were inserted to DB`);
      console.log('initdb has done');
      process.exit();
    });
};

main();

