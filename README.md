# MERN-boilerplate

This is a boilerplate project using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation


## Requirements

- [Node.js](https://nodejs.org/en/) 6+
- [MongoDB](https://www.mongodb.com/)


```shell
npm install
```

## Initializing DB

To initializing some dummy data to DB - should run:

```shell
node server/initdb
```
or
```shell
npm run initdb
```

by default it will insert 20 rows. If you need any amount of rows, you should set param to the comand:

```shell
node server/initdb --rows=3
```
!!! with comand ```npm run initdb``` key doesn't work !!!

## Running

Make sure to add a `config.js` file in the `config` folder. See the example there for more details.

Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```

## How work with?

To start working you should open in browser page : 'http://localhost:8080/shops'

Set at the page parameters ```(filters, search, sotring)``` if you need it
Click button ```'Get shops'``` and look at the shops data in the table.

