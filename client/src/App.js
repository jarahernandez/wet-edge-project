import { Route, Routes } from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import CreateFormula from './components/CreateFormula';
import DisplayAllFormulas from './components/DisplayAllFormulas';
import UseFormula from './components/UseFormula';
import UpdateFormula from './components/UpdateFormula';

function App() {

  const [formulas, setFormulas] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<DisplayAllFormulas formulas={formulas} setFormulas={setFormulas}/>}/>
        <Route path='/formula/new' element={<CreateFormula formulas={formulas} setFormulas={setFormulas}/>}/>
        <Route path='/formula/:id/use' element={<UseFormula/>}/>
        <Route path='/formula/:id/edit' element={<UpdateFormula/>}/>
      </Routes>
    </div>
  );
}

export default App;
