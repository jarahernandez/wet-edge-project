import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import FileBase64 from 'react-file-base64';

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
            <div>
                <h1>Wet Edge Formulas</h1>
                <Link to={`/`}><button>Back</button></Link>
            </div>
            <form onSubmit={submitHandler}>
                <section>
                    <h2>Formula Identifiers</h2>
                    <div>
                        <label>Formula Name:</label>
                        <input type="text" name='formulaName' onChange={changeHandler}/>
                        {
                            errors.formulaName?
                            <p>{errors.formulaName.message}</p>:null
                        }
                    </div>
                    <div>
                        {/* <label>Formula Image:</label>
                        <input type="text" name='formulaImage' onChange={changeHandler}/> */}
                        <FileBase64
                            multiple={false}
                            onDone={({ base64 }) => {
                                setFormula({...formula, formulaImage: base64})
                            }}/>
                        {
                            errors.formulaImage?
                            <p>{errors.formulaImage.message}</p>:null
                        }
                    </div>
                </section>
                <section>
                    <h2>Materials Needed</h2>
                    <div>
                        <label>1. </label>
                        <input type="text" name="name" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <input type="number" name="amount" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <button name="material1" onClick={materialsClickHandler} disabled={isDisabled}>Add</button>
                    </div>
                    <div>
                        <label>2. </label>
                        <input type="text" name="name" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <input type="number" name="amount" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <button name="material2" onClick={materialsClickHandler} disabled={isDisabled}>Add</button>
                    </div>
                    <div>
                        <label>3. </label>
                        <input type="text" name="name" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <input type="number" name="amount" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <button name="material3" onClick={materialsClickHandler} disabled={isDisabled}>Add</button>
                    </div>
                    <div>
                        <label>4. </label>
                        <input type="text" name="name" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <input type="number" name="amount" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <button name="material4" onClick={materialsClickHandler} disabled={isDisabled}>Add</button>
                    </div>
                    <div>
                        <label>5. </label>
                        <input type="text" name="name" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <input type="number" name="amount" onChange={materialChangeHandler} disabled={isDisabled}/>
                        <button name="material5" onClick={materialsClickHandler} disabled={isDisabled}>Add</button>
                    </div>
                    <button onClick={saveMaterialsHandler}>Save Materials</button>
                </section>
                <input type="submit" value="Create Formula"/>
            </form>
        </div>
)}

export default CreateFormula;