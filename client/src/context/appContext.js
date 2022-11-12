import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
import { 
        DISPLAY_ALERT, 
        CLEAR_ALERT,
        REGISTER_USER_BEGIN, 
        REGISTER_USER_SUCCESS, 
        REGISTER_USER_ERROR 
    } from './actions';


const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

//Default values    
const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || ''
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);    //reducer function will handle the dispatch

    const displayAlert = () =>{

        dispatch({
            type: DISPLAY_ALERT,
        });
        clearAlert();

    }

    const clearAlert = () =>{

        setTimeout(()=>{
            dispatch({
                type: CLEAR_ALERT,
            });
        }, 2000)

    }

    const saveUserInLocalStorage = ({user, token, location})=> {

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location);

    }

    const removeUserFromLocalStorage = ()=> {

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');

    }

    const registerUser = async(currentUser)=>{
        
        console.log(`From appContext, registerUser`);
        console.log(currentUser);

        dispatch({type: REGISTER_USER_BEGIN});

        try{

            const rawResponse = await axios.post('/api/v1/auth/register',
                currentUser
            );

            console.log(rawResponse);
            
            const {user, token, location} = rawResponse.data;

            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user, token, location
                }
            });

            //Add to local storage
            saveUserInLocalStorage({user, token, location});

        }catch(err){
            console.log(err);

            const msg = err.response.data.msg ? err.response.data.msg : 'Server caido. Intentalo mas tarde.';

            dispatch({
                type: REGISTER_USER_ERROR,
                payload: {
                    msg: msg
                }
            })
        }

        clearAlert();

    }

    return(
        <AppContext.Provider value={{...state, displayAlert, registerUser }}>
            { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, initialState, useAppContext }