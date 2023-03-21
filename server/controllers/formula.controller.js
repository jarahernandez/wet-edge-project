const Formula = require('../models/formula.model');

module.exports = {

    getAllFormulas: (req, res) => {
        Formula.find()
            .then(allFormulas => {
                res.json(allFormulas);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    createFormula: (req, res) => {
        Formula.create(req.body)
            .then(newFormula => {
                res.json(newFormula);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    getOneFormula: (req, res) => {
        Formula.findOne({_id:req.params.id})
            .then(oneFormula => {
                res.json(oneFormula);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    updateFormula: (req, res) => {
        Formula.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators:true})
            .then(updatedFormula => {
                res.json(updatedFormula);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    },

    deleteFormula: (req, res) => {
        Formula.deleteOne({_id:req.params.id})
            .then(result => {
                console.log(result);
                res.json(result);
            })
            .catch(err => {
                res.status(500).json({message: 'Something went wrong', error:err});
            })
    }
}