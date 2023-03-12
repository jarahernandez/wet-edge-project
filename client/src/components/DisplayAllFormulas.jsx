import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const DisplayAllFormulas = (props) => {

    const {formulas, setFormulas} = props;

    useEffect(() => {
        axios.get('http://localhost:8000/api/allFormulas')
            .then(allFormulas => {
                setFormulas(allFormulas.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div>
                <h1>Wet Edge Formulas</h1>
                <Link to={`/formula/new`}><button>Create Formula</button></Link>
            </div>
            {
                formulas.map(formula => (
                    <div key={formula._id}>
                        <h3>{formula.formulaName}</h3>
                        <img style={{width:'150px'}} src={formula.formulaImage} alt="Formula" />
                        <div>
                            {
                                Object.values(formula.materialsNeeded).map((value, key) => (
                                    <p key={key}>{value.name} : {value.amount}</p>
                                ))
                            }
                        </div>
                        <Link to={`/formula/${formula._id}/use`}><button>Use</button></Link>
                        <Link to={`/formula/${formula._id}/edit`}><button>Edit</button></Link>
                        <hr />
                    </div>
                ))
            }
        </div>
)}

export default DisplayAllFormulas;