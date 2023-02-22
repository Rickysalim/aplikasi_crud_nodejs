'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class products extends Model {
        static associate(models) {

        }
    }
    products.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nama_produk: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        keterangan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jumlah: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'products'
    })
    return products;
}