const path = require('path');
const { Sequelize, Model, DataTypes } = require('sequelize');

// TODO - create the new sequelize connection

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: true
})

module.exports = {
    db,
    Sequelize,
    DataTypes,
    Model
};
