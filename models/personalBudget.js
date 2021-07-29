module.exports = (sequelize, DataTypes) => {
    const budget = sequelize.define('personalBudget', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        concept: DataTypes.STRING(80),
        amount: DataTypes.DECIMAL(10, 2),
        date: {
            type: DataTypes.DATE,  
            defaultValue: sequelize.CURRENT_TIMESTAMP
        },
        type: DataTypes.STRING(50),
        reference: {
            type: DataTypes.STRING(80), 
            allowNull: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    });    
    return budget;
};