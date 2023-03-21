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
            <div className='d-flex justify-content-around align-items-center p-3 pb-5 text-light'>
                <h1>Wet Edge Formulas</h1>
                <Link to={`/`}><button className='btn btn-secondary'>Home</button></Link>
            </div>
            <div className='text-light'>
                <h2 className='mb-4'>{formula.formulaName}</h2>
                <img className='rounded-4 mb-5' src={formula.formulaImage} alt='Formula' />
                <form className='d-flex justify-content-center mb-5'>
                    <label className='fs-5 form-label me-2'>Batches:</label>
                    <input className='form-control w-25 me-2 text-light bg-black bg-opacity-10' type="number" onChange={changeHandler}/>
                    <button className='btn btn-secondary' onClick={clickHandler}>Calculate</button>
                </form>
                <div className='fs-4'>
                    {
                        loading?
                        null
                        :
                        Object.values(formula.materialsNeeded).map((value,key) =>(
                            <p key={key}>{value.name} : {(value.amount*batches)} bags</p>
                        ))
                    }
                </div>
            </div>
        </div>
)}

export default UseFormula;