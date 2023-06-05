'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class products extends Model {
        static associate(models) {
            models.products.belongsTo(models.users, {
                foreignKey: "users_id"
            })
        }
    }
    products.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        gambar: {
            type: DataTypes.STRING,
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
        },
        users_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            }
        }
    }, {
        sequelize,
        modelName: 'products'
    })
    return products;
}