const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Producto = sequelize.define('Producto', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    }, {
        tableName: 'productos',
        timestamps: false,
    });

    return Producto;
};
