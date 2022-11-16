import { useState } from 'react';
import { FormRow, Alert } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useAppContext } from "../../context/appContext";

const Profile = ()=>{

    const { user, showAlert, displayAlert, isLoading, updateUser } = useAppContext();

    const [name, setName] = useState(user?.name);               //Optional chaining operator. Si tenemos user logueado, el nombre, sino undefined.
    const [lastName, setLastName] = useState(user?.lastName);
    const [location, setLocation] = useState(user?.location);

    const submitForm = (e)=> {
        e.preventDefault();

        if(!name || !lastName || !location){
            displayAlert();
            return;
        }

        
        updateUser({name, lastName, location});

        console.log(`Submit perfil form`);
    }

    return(
        <Wrapper>
            <form className='form' onSubmit={submitForm}>
                <h3>Perfil</h3>

                {showAlert && <Alert />}

                <div className='form-center'>
                    <FormRow
                        labelText='Nombre' 
                        type='text'
                        name='name'
                        value={name}
                        handleChange={(e)=>{
                            setName(e.target.value);
                        }}
                    />

                    <FormRow 
                        labelText='Apellido'
                        type='text'
                        name='lastName'
                        value={lastName}
                        handleChange={(e)=>{
                            setLastName(e.target.value);
                        }}
                    />

                    <FormRow
                        labelText='Ciudad'
                        type='text'
                        name='location'
                        value={location}
                        handleChange={(e)=> setLocation(e.target.value) }
                    />

                    <button 
                        className='btn btn-block' 
                        type='submit' 
                        disabled={isLoading}
                        onSubmit={submitForm}
                    >
                        {isLoading ? 'Cargando' : 'Actualizar'}
                    </button>

                </div>
                
            </form>
        </Wrapper>
    );
}

export default Profile;