import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const DisplayAllFormulas = (props) => {

    const [formulas, setFormulas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/allFormulas')
            .then(allFormulas => {
                // console.log(allFormulas.data);
                setFormulas(allFormulas.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div>
                <h1>Wet Edge Formulas</h1>
                <Link to={`/formulas/new`}><button>Create Formula</button></Link>
            </div>
            {
                formulas.map(formula => (
                    <div key={formula._id}>
                        <h3>{formula.formulaName}</h3>
                        <h3>{formula.formulaImage}</h3>
                        <div>
                            {
                                Object.entries(formula.materialsNeeded).map((value, key) => (
                                    <p key={key}>{value[0]} : {value[1]}</p>
                                ))
                            }
                        </div>
                        <Link to={`/`}><button>Use</button></Link>
                        <hr />
                    </div>
                ))
            }
        </div>
)}

export default DisplayAllFormulas;