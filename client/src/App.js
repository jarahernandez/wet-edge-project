import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateFormula from './components/CreateFormula';
import DisplayAllFormulas from './components/DisplayAllFormulas';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<DisplayAllFormulas/>}/>
        <Route path='/formulas/new' element={<CreateFormula/>}/>
      </Routes>
    </div>
  );
}

export default App;
