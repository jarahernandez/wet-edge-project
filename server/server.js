const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(express.json({limit:'10mb'}), express.urlencoded({extended:true,limit:'10mb'}));

require('./config/mongoose.config');
require('./routes/formula.routes')(app);

app.listen(8000, ()=>{console.log('Server running on port: 8000');});