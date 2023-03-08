import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const CreateFormula = (props) => {

    const [materials, setMaterials] = useState({});
    const [materialName, setMaterialName] = useState("");
    const [count, setCount] = useState(0);

    const changeHandlerName = (e) => {
        setMaterialName(e.target.value);

        setMaterials({...materials, [materialName]:count})
    }

    const changeHandlerCount = (e) => {
        setCount(e.target.value)

        setMaterials({...materials, [materialName]:count})
    }

    console.log(materialName);
    console.log(count);
    
    return (
        <div>
            <div>
                <h1>Wet Edge Formulas</h1>
                <Link to={`/`}><button>Back</button></Link>
            </div>
            <form>
                <section>
                    <h2>Formula Identifiers</h2>
                    <div>
                        <label>Formula Name:</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Formula Image:</label>
                        <input type="text" />
                    </div>
                </section>
                <section>
                    <h2>Materials Needed</h2>
                    <div>
                        <label>1. </label>
                        <input type="text" name="key" onChange={changeHandlerName} />
                        <input type="number" name="value" onChange={changeHandlerCount} />
                    </div>
                    <div>
                        <label>2. </label>
                        <input type="text" name="key" onChange={changeHandlerName} />
                        <input type="number" name="value" onChange={changeHandlerCount} />
                    </div>
                </section>
            </form>
        </div>
)}

export default CreateFormula;