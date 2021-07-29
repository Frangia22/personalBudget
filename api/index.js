// Llamo a Op para realizar queries complejas
const { sequelize, Op } = require('sequelize');
//Importo los modelos
const db = require('../models');
//Traer todos los presupuestos
const getBudgets = async() => {
    const budgets = await db.personalBudget.findAll()
    .then(result => {
        return result;
    });
    return budgets;
}
//Traer presupuesto segun id
const getBudgetById = async(id) => {
    const budget = await db.personalBudget.findByPk(id)
    .then(result => {
        return result;
    });
    return budget;
}
//Agregar presupuesto
const addBudget = async(concept, amount, date, type, reference) => {
    const budget = await db.personalBudget.create({
        concept,
        amount,
        date,
        type,
        reference
    })
    return budget;
}
//Delete presupuesto
const deleteBudget = async(idBudget) => {
    const budget = await db.personalBudget.destroy({
        where: {
            id: idBudget
        }
    })
    return budget;
}
//Update presupuesto
const updateBudget = async(id, concept, amount, type, reference) => {
    const budget = await db.personalBudget.update({ concept, amount, type, reference},{
        where: {
            id
        }
    })
    return budget;
}

module.exports = {
    getBudgets,
    addBudget, 
    deleteBudget,
    getBudgetById,
    updateBudget
}