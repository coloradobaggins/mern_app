import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    showAlert: false
}

const Register = ()=>{

    const [values, setValues] = useState(initialState);
    //For global state annd useNvaigate

    const toggleMember = () =>{
        setValues({...values, isMember:!values.isMember})   //Destructuring and Setting Equal to oposite!

        console.log(`toggleMember!`);
    }

    const handleChange = (e) => {
        console.log(e.target);

    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }

    return(
        <Wrapper className='full-page'>
            Register
            <form className='form' onSubmit={onSubmit}>
                <Logo />

                <h3>{values.isMember ? 'Login' : 'Registrate'}</h3>

                {/* Show Alert Component if ... */}
                {values.showAlert && <Alert /> }
                
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