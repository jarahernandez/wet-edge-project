const mongoose = require('mongoose');

const FormulaSchema = new mongoose.Schema({
    formulaName: {
        type: String,
        minLength: [3, 'Formula name must be 3 characters or more'],
        required: [true, 'Formula same is required'],
    },
    formulaImage: {
        type:String
    },
    materialsNeeded: [{}]
}, {minimize:false, timestamps:true})

const Formula = mongoose.model('Formula', FormulaSchema);

module.exports = Formula;