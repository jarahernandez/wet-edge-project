import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

const UseFormula = (props) => {

    const [formula, setFormula] = useState({});
    const [loading, setLoading] = useState(true)
    const {id} = useParams();
    const [batches, setBatches] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8000/api/oneFormula/'+id)
            .then(oneFormula => {
                setFormula(oneFormula.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id])

    const changeHandler = (e) => {
        setBatches(e.target.value)
    }
    
    const clickHandler = (e) => {
        e.preventDefault();
        setLoading(false)
    }

    return (
        <div>
            <div>
                <h1>Wet Edge Formulas</h1>
                <Link to={`/`}><button>Back</button></Link>
            </div>
            <div>
                <h2>{formula.formulaName}</h2>
                <img src={formula.formulaImage} alt='Formula' />
                <form>
                    <label>Batches:</label>
                    <input type="number" onChange={changeHandler}/>
                    <button onClick={clickHandler}>Calculate</button>
                </form>
                <div>
                    {
                        loading?
                        null
                        :
                        Object.values(formula.materialsNeeded).map((value,key) =>(
                            <p key={key}>{value.name} : {(value.amount*batches)}</p>
                        ))
                    }
                </div>
            </div>
        </div>
)}

export default UseFormula;