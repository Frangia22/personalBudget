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
//Traigo los ultimos 10 registros
//SELECT * FROM `personalbudget`ORDER BY date DESC LIMIT 2; 
const getLastBudget = async() => {
    const budget = await db.personalBudget.findAll({
        limit: 10,
        order: [
            ['date', 'DESC']
        ]              
    })
    return budget;
}
//Traer ingresos
//SELECT * FROM `personalbudget` WHERE type = 'Entry'; 
const getEntryBudget = async() => {
    const entry = await db.personalBudget.findAll({
        where: {
            type: 'Entry'
        }
    })
    .then(result => {
        return result;
    });
    return entry;
}
//Traer egresos
const getEgressBudget = async() => {
    const egress = await db.personalBudget.findAll({
        where: {
            type: 'Egress'
        }
    })
    .then(result => {
        return result;
    });
    return egress;
}
//Buscador
const getBudgetByTitle = async(query) => {
    const budget = await db.personalBudget.findAll({
        where: {
            concept: {
                [Op.substring]: query
            }
        }
    })
    .then(result => {
        return result;
    });
    return budget;
}
//Sumo todos los ingresos
//SELECT SUM(amount) FROM `personalbudget` WHERE type = 'entry'; 
const sumEntry = async() => {
    const entry = await db.personalBudget.sum('amount', {
        where: {
            type: 'Entry'
        }
    })
    .then(result => {
        return result;
    })
    return entry;
}
//Sumo todos los egresos
const sumEgress = async() => {
    const egress = await db.personalBudget.sum('amount', {
        where: {
            type: 'Egress'
        }
    })
    .then(result => {
        return result;
    })
    return egress;
}
module.exports = {
    getBudgets,
    addBudget, 
    deleteBudget,
    getBudgetById,
    updateBudget,
    getLastBudget,
    getEntryBudget,
    getBudgetByTitle,
    getEgressBudget,
    sumEntry,
    sumEgress
}