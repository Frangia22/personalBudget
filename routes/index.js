var express = require('express');
var router = express.Router();
//Traigo las queries 
const api = require('../api');

/* GET home page. */
router.get('/', async (req, res) => {
  const budgets = await api.getLastBudget();
  const budgetEntrys = await api.sumEntry();
  const budgetEgress = await api.sumEgress();
  const balance = ((budgetEntrys)-(budgetEgress));
  
  //console.log(entry);
  res.render('index', { title: 'Personal budget', budgets, budgetEntrys, budgetEgress, balance});
});
/* Admin panel */
router.get('/adminBudget', async (req, res) => {
  const budgets = await api.getBudgets();
  res.render('pages/adminBudget', { title: 'Admin panel', budgets});
});
/* Buscador GET */
router.get('/buscar', async (req, res) => {
  // Los datos de la URL vienen en req.query
  const budgets = await api.getBudgetByTitle(req.query.q);
  res.render('pages/adminBudget', {
    title: 'Personal budget search',
    budgets
  });
  // res.send(book);
});
/* Add operation GET */
router.get('/addBudget', (req, res) => {
  res.render('pages/addBudget', { title: 'Add operation'});
});
/* Add operation POST */
router.post('/add', async (req, res) => {
  const {concept, amount, date, type, reference} = req.body
  await api.addBudget(concept, amount, date, type, reference);
  console.log(req.body);
  res.redirect('/adminBudget');
});
/* Delete operation GET */
router.get('/delete/:id', async (req, res) => {
  const affectedRows = await api.deleteBudget(req.params.id);
  if (affectedRows > 0) {
    res.redirect('/adminBudget');
  }else{
    res.send('Algo salio mal en el proceso de eliminación');
  }  
});
/* Edit operation GET */
router.get('/edit/:id', async (req, res) => {
  const budget = await api.getBudgetById(req.params.id)
  res.render('pages/editBudget', { title: 'Edit operation', budget});
});
/* Edit operation POST */
router.post('/edit/:id', async (req, res) => {
  const {concept, amount, type, reference} = req.body
  const id = req.params.id;
  await api.updateBudget(id, concept, amount, type, reference);
  console.log(req.body);
  res.redirect('/adminBudget');
});


module.exports = router;
