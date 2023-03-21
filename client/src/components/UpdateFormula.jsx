import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const UpdateFormula = (props) => {

    const [formula, setFormula] = useState({
        formulaName: "",
        formulaImage: "",
        materialsNeeded: {}
    });
    const [formulaName, setFormulaName] = useState("");
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [material, setMaterial] = useState({});
    const [materials, setMaterials] = useState({});
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/oneFormula/' + id)
            .then(oneFormula => {
                setFormula(oneFormula.data);
                setFormulaName(oneFormula.data.formulaName);
                setMaterials(oneFormula.data.materialsNeeded);
            })
            .catch(err => {
                console.log(err);
            })
        }, [id])
        
        const submitHandler = (e) => {
            e.preventDefault();
            
            axios.put(`http://localhost:8000/api/updateFormula/${id}`, formula)
            .then(res => {
                navigate('/');
            })
            .catch(err => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors)
            })
    }

    const clickHandler = (e) => {
        e.preventDefault();
        setLoading(false);
    }

    const changeHandler = (e) => {
        setFormula({...formula, [e.target.name]:e.target.value})
    }

    // const materialChangeHandler = (e) => {
    //     // setMaterial({...material, [e.target.name]:e.target.value})
    // }

    const cchcch = (e) => {
        setMaterial({...material, [e.target.name]:e.target.value});
        setMaterials({...materials, [e.target.id]:{...material, [e.target.name]:e.target.value}});
        setFormula({...formula, materialsNeeded:{...materials, [e.target.id]:{...material, [e.target.name]:e.target.value}}})
    }

    // const inputOnClick = (e) => {
    //     e.preventDefault();
    //     setMaterial({...material, [e.target.name]:e.target.value})
    // }

    const editClickHandler = (e) => {
        e.preventDefault();
        setMaterial(materials[e.target.name])

    }

    // const saveMaterialsHandler = (e) => {
    //     e.preventDefault();
    //     setFormula({...formula, materialsNeeded:materials})
    // }

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/deleteFormula/${id}`)
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className='d-flex justify-content-around align-items-center p-3 pb-5 text-light'>
                <h1>Wet Edge Formulas</h1>
                <Link to={`/`}><button className='btn btn-secondary'>Home</button></Link>
            </div>
            <div>
                {
                    loading ?
                        <div className='text-light fs-3 my-5 py-5'>
                            <p>Are you sure you want make changes to "{formulaName}"?</p>
                            <button className='btn btn-secondary me-2' onClick={clickHandler}>Yes</button>
                            <Link to={'/'}><button className='btn btn-secondary ms-2'>No</button></Link>
                        </div>
                        :
                        <div className='text-light'>
                            <h2 className='my-4'>Editing: {formulaName}</h2>
                            <form className='d-flex flex-column text-light align-items-center' onSubmit={submitHandler}>
                                <section>
                                    <div>
                                        <label className='form-label mt-3'>Formula Name:</label>
                                        <input className='form-control text-light bg-black bg-opacity-10' type="text" name='formulaName' onChange={changeHandler} value={formula.formulaName}/>
                                        {
                                            errors.formulaName?
                                            <p className='text-danger mb-4'>{errors.formulaName.message}</p>:null
                                        }
                                    </div>
                                    <div className='d-flex flex-column align-items-center'>
                                        <img className='rounded-4 mb-2 mt-5' style={{ width: '150px' }} src={formula.formulaImage} alt="Formula" />
                                        <FileBase64
                                            multiple={false}
                                            onDone={({ base64 }) => {
                                                setFormula({ ...formula, formulaImage: base64 })
                                            }} />
                                        {
                                            errors.formulaImage?
                                            <p className='text-danger mb-4'>{errors.formulaImage.message}</p>:null
                                        }
                                    </div>
                                </section>
                                <section>
                                    <h2 className='mt-4'>Materials Needed</h2>
                                    {
                                        formula.materialsNeeded.material1?
                                        <div className='d-flex mb-2'>
                                            <label className='fs-4 me-2'>1. </label>
                                            <input className='form-control me-2 text-light bg-black bg-opacity-10' type="text" name="name" id="material1" onChange={cchcch} value={formula.materialsNeeded.material1.name}/>
                                            <input className='form-control text-light bg-black bg-opacity-10' type="number" name="amount" id="material1" onChange={cchcch} value={formula.materialsNeeded.material1.amount}/>
                                            <button className='btn btn-secondary ms-2' name="material1" onClick={editClickHandler}>Edit</button>
                                        </div>
                                        :
                                        null
                                    }
                                    {
                                        formula.materialsNeeded.material2?
                                        <div className='d-flex mb-2'>
                                            <label className='fs-4 me-2'>2. </label>
                                            <input className='form-control me-2 text-light bg-black bg-opacity-10' type="text" name="name" id="material2" onChange={cchcch} value={formula.materialsNeeded.material2.name}/>
                                            <input className='form-control text-light bg-black bg-opacity-10' type="number" name="amount" id="material2" onChange={cchcch} value={formula.materialsNeeded.material2.amount}/>
                                            <button className='btn btn-secondary ms-2' name="material2" onClick={editClickHandler}>Edit</button>
                                        </div>
                                        :
                                        null
                                    }
                                    {
                                        formula.materialsNeeded.material3?
                                        <div className='d-flex mb-2'>
                                            <label className='fs-4 me-2'>3. </label>
                                            <input className='form-control me-2 text-light bg-black bg-opacity-10' type="text" name="name" id="material3" onChange={cchcch} value={formula.materialsNeeded.material3.name}/>
                                            <input className='form-control text-light bg-black bg-opacity-10' type="number" name="amount" id="material3" onChange={cchcch} value={formula.materialsNeeded.material3.amount}/>
                                            <button className='btn btn-secondary ms-2' name="material3" onClick={editClickHandler}>Edit</button>
                                        </div>
                                        :
                                        null
                                    }
                                    {
                                        formula.materialsNeeded.material4?
                                        <div className='d-flex mb-2'>
                                            <label className='fs-4 me-2'>4. </label>
                                            <input className='form-control me-2 text-light bg-black bg-opacity-10' type="text" name="name" id="material4" onChange={cchcch} value={formula.materialsNeeded.material4.name}/>
                                            <input className='form-control text-light bg-black bg-opacity-10' type="number" name="amount" id="material4" onChange={cchcch} value={formula.materialsNeeded.material4.amount}/>
                                            <button className='btn btn-secondary ms-2' name="material4" onClick={editClickHandler}>Edit</button>
                                        </div>
                                        :
                                        null
                                    }
                                    {
                                        formula.materialsNeeded.material5?
                                        <div className='d-flex mb-2'>
                                            <label className='fs-4 me-2'>5. </label>
                                            <input className='form-control me-2 text-light bg-black bg-opacity-10' type="text" name="name" id="material5" onChange={cchcch} value={formula.materialsNeeded.material5.name}/>
                                            <input className='form-control text-light bg-black bg-opacity-10' type="number" name="amount" id="material5" onChange={cchcch} value={formula.materialsNeeded.material5.amount}/>
                                            <button className='btn btn-secondary ms-2' name="material5" onClick={editClickHandler}>Edit</button>
                                        </div>
                                        :
                                        null
                                    }
                                    {/* <button onClick={saveMaterialsHandler}>Save Materials</button> */}
                                    <hr />
                                </section>
                                <div>
                                    <input className='btn btn-primary me-2' type="submit" value="Update Formula" />
                                    <button className='btn btn-danger ms-2' onClick={deleteHandler}>Delete Formula</button>
                                </div>
                            </form>
                        </div>
                }
            </div>
        </div>
    )
}

export default UpdateFormula;

// for next working session: set all materials needed inputs to disable and have the edit button to enable them while setting material to the values of that input
// update page working 