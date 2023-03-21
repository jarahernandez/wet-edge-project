import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const DisplayAllFormulas = (props) => {

    const {formulas, setFormulas} = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/allFormulas')
            .then(allFormulas => {
                setFormulas(allFormulas.data);
            })
            .catch(err => console.log(err))
    }, [])

    const showMaterials = (e) => {
        e.preventDefault();

        setShow(!show);
    }

    return (
        <div>
            <div className='d-flex justify-content-around align-items-center p-3 pb-0 text-light'>
                <h1>Wet Edge Formulas</h1>
                <div>
                    <Link to={`/formula/new`}><button className='btn btn-secondary me-1'>Create Formula</button></Link>
                    <button className='btn btn-secondary ms-1' onClick={showMaterials}>{show? 'Hide Materials':'Show Materials'}</button>
                </div>
            </div>
            <div className='d-flex justify-content-center flex-wrap'>
                {
                    formulas.map(formula => (
                        <div className='d-flex align-items-center flex-column m-5 border border-3 rounded-4 py-2 px-5 bg-black text-light' key={formula._id}>
                            <h3 className='mb-3'>{formula.formulaName}</h3>
                            <Link to={`/formula/${formula._id}/use`}>
                                <img className='rounded-4 mb-3' style={{width:'150px'}} src={formula.formulaImage} alt="Formula" />
                            </Link>
                            {
                                show?
                                <div>
                                    {
                                        Object.values(formula.materialsNeeded).map((value, key) => (
                                            <p className='my-0' key={key}>{value.name} : {value.amount}</p>
                                        ))
                                    }
                                </div>
                                :
                                <p className='my-0'>Materials...</p>
                            }
                            <div className='mt-3 mb-2 align-items-bottom'>
                                <Link to={`/formula/${formula._id}/use`}><button className='btn btn-primary me-1 text-light'>Use</button></Link>
                                <Link to={`/formula/${formula._id}/edit`}><button className='btn btn-warning ms-1 text-light'>Edit</button></Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
)}

export default DisplayAllFormulas;