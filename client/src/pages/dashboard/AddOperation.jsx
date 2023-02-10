import { useState } from 'react';
import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from '../../context/appContext';
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddOperation = ()=>{

    const { 
        isLoading, 
        showAlert, 
        displayAlert, 
        isEditing, 
        operationLocation, 
        typeOpOptions, 
        addOperation,
        client, 
        ship, 
        products, 
        type,
        editOperation,
        handleChange
    } = useAppContext();

    
    // const [client, setClient] = useState('');
    // const [ship, setShip] = useState('');
    // const [operationType, setOperationType] = useState('');
    // const [operationLocationSelect, setOperationLocationSelect] =useState(operationLocation);
    // const [products, setProducts] = useState([]);
    
    

    const clearForm = (e)=> {
        e.preventDefault();
        
        clear();
    }

    const clear = ()=>{

        
        // setClient('');
        // setShip('');
        // setProducts([]);
    
        

        console.log(`Clear de form!`);

    }

    //AddOperation
    const submitOperation = (e)=>{
        e.preventDefault();

        if(!client || ! ship || !operationLocation || !typeOpOptions){
            
            displayAlert();

        }

        if(isEditing){
            editOperation();
            return
        }

        addOperation({client, ship, products, operationLocation, type});

        console.log(`Add operation!`);

        clear();
    }

    const handleAddOperationChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        console.log(`${name}:${value}`);

        handleChange({name, value});
    }

    return(
        <Wrapper>
            <form className="form" onSubmit={submitOperation}>
                
                <h3>{isEditing ? 'Editar operacion' : 'Crear operacion'}</h3>

                {showAlert && <Alert />}

                <div className='form-center'>
                    <FormRow 
                        labelText='Cliente'
                        type='text'
                        name='client'
                        value={client}
                        //handleChange={(e)=> setClient(e.target.value)}
                        handleChange={ handleAddOperationChange }
                    />

                    <FormRow 
                        labelText='Buque'
                        type='text'
                        name='ship'
                        value={ship}
                        //handleChange={(e)=> setShip(e.target.value)}
                        handleChange={ handleAddOperationChange }
                    />

                    <FormRow 
                        labelText='Producto'
                        type='text'
                        name='products'
                        value={products}
                        //handleChange={(e)=> setProducts(e.target.value)}
                        handleChange={ handleAddOperationChange }
                    />

                    <FormRow 
                        labelText='Lugar operacion'
                        type='text'
                        name='operationLocation'
                        value={operationLocation}
                        //handleChange={(e)=>{ setOperationLocationSelect(e.target.value); }}
                        handleChange={ handleAddOperationChange }
                    />
                    
                    <FormRowSelect 
                        labelText='Tipo' 
                        name='typeOp'
                        /*handleChange={(e)=> {

                            setOperationType(e.target.value);

                            console.log(`Operatin selected: `);
                            console.log(e.target.value);

                        }}*/
                        handleChange={ handleAddOperationChange }
                        list={typeOpOptions}
                    />
                    <div className='btn-container'>
                        <button
                            className='btn block' 
                            type='submit' 
                            disabled={isLoading}
                        >
                            Agregar
                        </button>
                        <button 
                            className='btn clear-btn' 
                            type='button' 
                            onClick={clearForm}
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
                
            </form>
        </Wrapper>
    );
}

export default AddOperation;