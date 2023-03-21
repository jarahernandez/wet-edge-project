import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import '../App.css'

const CreateFormula = (props) => {

    const [formula, setFormula] = useState({
        formulaName:"",
        formulaImage:"",
        materialsNeeded: {}
    });
    const [material, setMaterial] = useState({});
    const [materials, setMaterials] = useState({});
    const {formulas, setFormulas} = props;
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isDisabled, setIsDisabled] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/createFormula', formula)
            .then(newFormula => {
                setFormulas([...formulas, newFormula.data])
                navigate('/');
            })
            .catch(err => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors)
            })
    }

    const changeHandler = (e) => {
        setFormula({...formula, [e.target.name]:e.target.value})
    }

    const materialChangeHandler = (e) => {
        setMaterial({...material, [e.target.name]:e.target.value})
    }

    const materialsClickHandler = (e) => {
        e.preventDefault();
        setMaterials({...materials, [e.target.name]:material})
    }

    const saveMaterialsHandler = (e) => {
        e.preventDefault();
        setFormula({...formula, materialsNeeded:materials})
        setIsDisabled(true)
    }

    return (
        <div>
            <div className='d-flex justify-content-around align-items-center p-3 pb-5 text-light'>
                <h1>Wet Edge Formulas</h1>
                <Link to={`/`}><button className='btn btn-secondary'>Home</button></Link>
            </div>
            <form className='d-flex flex-column text-light align-items-center' onSubmit={submitHandler}>
                <section className='mb-3'>
                    <h2 className='mt-3' > Formula Identifiers</h2>
                    <div className='mb-4'>
                        <label className='form-label mt-3'>Formula Name:</label>
                        <input className='form-control text-light bg-black bg-opacity-10' type="text" name='formulaName' onChange={changeHandler}/>
                        {
                            errors.formulaName?
                            <p className='text-danger'>{errors.formulaName.message}</p>:null
                        }
                    </div>
                    <div className='ps-5 mb-4'>
                        {/* <label>Formula Image:</label>
                        <input type="text" name='formulaImage' onChange={changeHandler}/> */}
                        <FileBase64
                            multiple={false}
                            onDone={({ base64 }) => {
                                setFormula({...formula, formulaImage: base64})
                            }}/>
                        {
                            errors.formulaImage?
                            <p className='text-danger pe-5 mb-4'>{errors.formulaImage.message}</p>:null
                        }
                    </div>
                </section>
                <section>
                    <h2>Materials Needed</h2>
                    <div className='d-flex mb-2'>
                        <label className='fs-4 me-2'>1. </label>
                        <input className='form-control me-2 text-light bg-black bg-opacity-10' placeholder='Name' type="text" name="name" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <input className='form-control text-light bg-black bg-opacity-10' placeholder='Amount' type="number" name="amount" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <button className='btn btn-secondary ms-2' name="material1" onClick={materialsClickHandler} disabled={isDisabled}>Add</button>
                    </div>
                    <div className='d-flex mb-2'>
                        <label className='fs-4 me-2'>2. </label>
                        <input className='form-control me-2 text-light bg-black bg-opacity-10' type="text" name="name" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <input className='form-control text-light bg-black bg-opacity-10' type="number" name="amount" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <button className='btn btn-secondary ms-2' name="material2" onClick={materialsClickHandler} disabled={isDisabled}>Add</button>
                    </div>
                    <div className='d-flex mb-2'>
                        <label className='fs-4 me-2'>3. </label>
                        <input className='form-control me-2 text-light bg-black bg-opacity-10' type="text" name="name" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <input className='form-control text-light bg-black bg-opacity-10' type="number" name="amount" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <button className='btn btn-secondary ms-2' name="material3" onClick={materialsClickHandler} disabled={isDisabled}>Add</button>
                    </div>
                    <div className='d-flex mb-2'>
                        <label className='fs-4 me-2'>4. </label>
                        <input className='form-control me-2 text-light bg-black bg-opacity-10' type="text" name="name" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <input className='form-control text-light bg-black bg-opacity-10' type="number" name="amount" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <button className='btn btn-secondary ms-2' name="material4" onClick={materialsClickHandler} disabled={isDisabled}>Add</button>
                    </div>
                    <div className='d-flex mb-2'>
                        <label className='fs-4 me-2'>5. </label>
                        <input className='form-control me-2 text-light bg-black bg-opacity-10' type="text" name="name" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <input className='form-control text-light bg-black bg-opacity-10' type="number" name="amount" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <button className='btn btn-secondary ms-2' name="material5" onClick={materialsClickHandler} disabled={isDisabled}>Add</button>
                    </div>
                    <button className='btn btn-secondary mt-2' onClick={saveMaterialsHandler}>Save Materials</button>
                    <hr />
                </section>
                <input className='btn btn-primary ' type="submit" value="Create Formula"/>
            </form>
        </div>
)}

export default CreateFormula;