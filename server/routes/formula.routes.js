const FormulaController = require('../controllers/formula.controller');

module.exports = app => {
    app.get('/api/allFormulas', FormulaController.getAllFormulas);
    app.post('/api/createFormula', FormulaController.createFormula);
    app.get('/api/oneFormula/:id', FormulaController.getOneFormula);
    app.put('/api/updateFormula/:id', FormulaController.updateFormula);
    app.delete('/api/deleteFormula/:id', FormulaController.deleteFormula);
}