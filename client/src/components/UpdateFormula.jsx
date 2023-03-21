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
                console.log(err);
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

    return (
        <div>
            <div>
                <h1>Wet Edge Formulas</h1>
                <Link to={`/`}><button>Back</button></Link>
            </div>
            <div>
                {
                    loading ?
                        <div>
                            <p>Are you sure you want make changes to "{formulaName}"?</p>
                            <button onClick={clickHandler}>Yes</button>
                            <Link to={'/'}><button>No</button></Link>
                        </div>
                        :
                        <div>
                            <h2>Editing: {formulaName}</h2>
                            <form onSubmit={submitHandler}>
                                <section>
                                    <div>
                                        <label>Formula Name:</label>
                                        <input type="text" name='formulaName' onChange={changeHandler} value={formula.formulaName}/>
                                    </div>
                                    <div>
                                        <img style={{ width: '150px' }} src={formula.formulaImage} alt="Formula" />
                                        <FileBase64
                                            multiple={false}
                                            onDone={({ base64 }) => {
                                                setFormula({ ...formula, formulaImage: base64 })
                                            }} />
                                    </div>
                                </section>
                                <section>
                                    <h2>Materials Needed</h2>
                                    <div>
                                        <label>1. </label>
                                        <input type="text" name="name" id="material1" onChange={cchcch} value={formula.materialsNeeded.material1.name}/>
                                        <input type="number" name="amount" id="material1" onChange={cchcch} value={formula.materialsNeeded.material1.amount}/>
                                        <button name="material1" onClick={editClickHandler}>Edit</button>
                                    </div>
                                    <div>
                                        <label>2. </label>
                                        <input type="text" name="name" id="material2" onChange={cchcch} value={formula.materialsNeeded.material2.name}/>
                                        <input type="number" name="amount" id="material2" onChange={cchcch} value={formula.materialsNeeded.material2.amount}/>
                                        <button name="material2" onClick={editClickHandler}>Edit</button>
                                    </div>
                                    {
                                        formula.materialsNeeded.material3?
                                            <div>
                                                <label>3. </label>
                                                <input type="text" name="name" id="material3" onChange={cchcch} value={formula.materialsNeeded.material3.name}/>
                                                <input type="number" name="amount" id="material3" onChange={cchcch} value={formula.materialsNeeded.material3.amount}/>
                                                <button name="material3" onClick={editClickHandler}>Edit</button>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        formula.materialsNeeded.material4?
                                            <div>
                                                <label>4. </label>
                                                <input type="text" name="name" id="material4" onChange={cchcch} value={formula.materialsNeeded.material4.name}/>
                                                <input type="number" name="amount" id="material4" onChange={cchcch} value={formula.materialsNeeded.material4.amount}/>
                                                <button name="material4" onClick={editClickHandler}>Edit</button>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        formula.materialsNeeded.material5?
                                            <div>
                                                <label>5. </label>
                                                <input type="text" name="name" id="material5" onChange={cchcch} value={formula.materialsNeeded.material5.name}/>
                                                <input type="number" name="amount" id="material5" onChange={cchcch} value={formula.materialsNeeded.material5.amount}/>
                                                <button name="material5" onClick={editClickHandler}>Edit</button>
                                            </div>
                                            :
                                            null
                                    }
                                    {/* <button onClick={saveMaterialsHandler}>Save Materials</button> */}
                                </section>
                                <input type="submit" value="Submit Changes" />
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