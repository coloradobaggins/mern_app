import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    //showAlert: false //Comes from context (global)
}

const Register = ()=>{

    const [values, setValues] = useState(initialState);

    //Global state and useNvaigate
    const { isLoading, showAlert, displayAlert } = useAppContext();

    const toggleMember = () =>{
        setValues({...values, isMember:!values.isMember})   //Destructuring and Setting Equal to oposite!

        console.log(`toggleMember!`);
    }

    const handleChange = (e) => {
        //console.log(e.target);

        /*
            Update state
            Don't overwrite all obj values (initialState). 
            Destructuring. Get me all the current values that are in the state.
            Dynamically access the property that is equal to a name of the input: [e.target.name]
            Equal to its target value
        */
        setValues({...values, [e.target.name]: e.target.value}); 

    }

    /*
        Get from appContext displayAlert (useAppContext()). So if we don't have all
        required fields fullfilled, show the alert.
    */
    const onSubmit = (e) => {
        e.preventDefault();
        
        const { name, email, password, isMember } = values;
        
        if(!email || !password || (!isMember && !name)){
            displayAlert();
            return;
        }
        
        console.log(e.target);
        console.log({...values})

    }

    return(
        <Wrapper className='full-page'>
            Register
            <form className='form' onSubmit={onSubmit}>
                <Logo />

                <h3>{values.isMember ? 'Login' : 'Registrate'}</h3>

                {/* Show Alert Component if ... */}
                {showAlert && <Alert /> }
                
                {/* Name */}
                {!values.isMember && ( 
                    <FormRow 
                        labelText='Usuario'
                        type='text'
                        name='name'
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}

                {/* Email */}
                <FormRow 
                    type='email'
                    name='email'
                    value={values.email}
                    handleChange={handleChange}
                />

                {/* Password */}
                <FormRow 
                    labelText='Constraseña'
                    type='password'
                    name='password'
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type='submit' className='btn btn-block'>Enviar</button>
                <p>
                    {values.isMember ? 'Registrarse para ingresar' : 'Ya estas registrado?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Registrarse' : 'Login' }
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register;