import { Route, Routes } from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import CreateFormula from './components/CreateFormula';
import DisplayAllFormulas from './components/DisplayAllFormulas';

function App() {

  const [formulas, setFormulas] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<DisplayAllFormulas formulas={formulas} setFormulas={setFormulas}/>}/>
        <Route path='/formulas/new' element={<CreateFormula formulas={formulas} setFormulas={setFormulas}/>}/>
      </Routes>
    </div>
  );
}

export default App;
