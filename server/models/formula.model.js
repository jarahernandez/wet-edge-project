const mongoose = require('mongoose');

const FormulaSchema = new mongoose.Schema({
    formulaName: {
        type: String,
        minLength: [3, 'Formula name must be 3 characters or more'],
        required: [true, 'Formula name is required'],
    },
    formulaImage: {
        type:String,
        required: [true, 'Formula image is required']
    },
    materialsNeeded: {}
}, {minimize:false, timestamps:true})

const Formula = mongoose.model('Formula', FormulaSchema);

module.exports = Formula;