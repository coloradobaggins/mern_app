import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
import { 
        DISPLAY_ALERT, 
        CLEAR_ALERT,
        REGISTER_USER_BEGIN, 
        REGISTER_USER_SUCCESS, 
        REGISTER_USER_ERROR,
        LOGIN_USER_BEGIN, 
        LOGIN_USER_SUCCESS, 
        LOGIN_USER_ERROR,
        TOGGLE_SIDEBAR,
        LOGOUT_USER,
        UPDATE_USER_BEGIN,
        UPDATE_USER_SUCCESS,
        UPDATE_USER_ERROR,
        CREATE_OP_BEGIN,
        CREATE_OP_SUCCESS,
        CREATE_OP_ERROR,
        GET_OP_BEGIN,
        GET_OP_SUCCESS,
        GET_OP_ERROR
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
    showSidebar: false,
    isEditing: false,
    idOperationEdit: '',
    operationLocation: userLocation || '',
    typeOpOptions: ['carga', 'descarga'],
    operations: [],                             //Operaciones totaales del user
    totalOperations: 0,                          //Cant operaciones
    opPages: 1,                                 //Paginas a mostrar
    cantPages: 1                                     //Pagina a mostrar por default
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

            const rawResponse = await axios.post('/api/v1/auth/register', currentUser);

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

    const loginUser = async(currentUser)=>{

        console.log(`onLogin`)
        console.log(currentUser);

        dispatch({type: LOGIN_USER_BEGIN});

        try{

            const rawData = await axios.post('/api/v1/auth/login', currentUser);

            console.log(rawData);

            const {user, token, location} = rawData.data;

            dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:{
                    user, token, location
                }
            });

            //Add to local storage
            saveUserInLocalStorage({user, token, location});

        }catch(err){
            console.log(err);

            const msg = err.response.data.msg ? err.response.data.msg : 'Server caido. Intentalo mas tarde.';

            dispatch({
                type:LOGIN_USER_ERROR,
                payload: msg
            })
        }

        clearAlert();

    }

    const toggleSidebar = () =>{

        dispatch({
            type: TOGGLE_SIDEBAR
        });

    }

    const logoutUser = ()=> {

        dispatch({
            type: LOGOUT_USER
        });

        // Clean local storage
        removeUserFromLocalStorage();

    }
    
    const updateUser = async(theUser)=> {

        console.log(theUser);

        dispatch({type: UPDATE_USER_BEGIN});

        try{

            const rawData = await axios.patch('/api/v1/auth/updateUser', theUser, {
                headers:{
                    Authorization: `Bearer ${state.token}`,
                },
            });

            console.log(rawData);
            console.log(rawData.data);

            const { user, token } = rawData.data;
            const location = user.location;

           

            
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: user, token, location
            });
            

            saveUserInLocalStorage({user, token, location});

        }catch(err){
            console.log(err);

            const msg = err.response.data.msg ? err.response.data.msg : 'Server caido. Intentalo mas tarde.';

            dispatch({
                type: UPDATE_USER_ERROR,
                payload: msg
            })
        }
        
        clearAlert();

    }

    const addOperation = async(opData) =>{

        console.log(`opData: `);
        console.log(opData);

        dispatch({ type: CREATE_OP_BEGIN });

        try{

            const rawData = await axios.post('/api/v1/operations/op', opData, {
                headers:{
                    Authorization: `Bearer ${state.token}`,
                },
            });

            console.log(rawData.data);

            dispatch({type: CREATE_OP_SUCCESS});

        }catch(err){
            console.log(err);

            const msg = err.response.data.msg ? err.response.data.msg : 'Server caido. Intentalo mas tarde.';

            dispatch({
                type: CREATE_OP_ERROR,
                payload: msg
            });

        }

        clearAlert();

    }

    const getOperations = async()=> {

        dispatch({type: GET_OP_BEGIN});

        try{

            const rawData = await axios.get('/api/v1/operations/op', {
                headers:{
                    Authorization: `Bearer ${state.token}`,
                }
            });

            console.log(rawData.data);
            
            const { operations, cantOperations, cantPages } = rawData.data;


            console.log(`CantOperations:::: `);
            console.log(cantOperations);

            dispatch({
                type: GET_OP_SUCCESS,
                payload: {
                    operations,
                    cantOperations,
                    cantPages
                }
            });
            

        }catch(err){

            console.log(err);
            //logoutUser();
        }

        clearAlert();

    }

    const modifyOperation = (idOp) => {
        console.log(`Modificar operacion id: ${idOp}`);
    }

    const deleteOperation = (idOp)=> {
        console.log(`Eliminar operacion id: ${idOp}`);
    }

    return(
        <AppContext.Provider 
            value={{
                ...state, 
                displayAlert, 
                registerUser, 
                loginUser, 
                toggleSidebar, 
                logoutUser, 
                updateUser,
                addOperation,
                getOperations,
                modifyOperation,
                deleteOperation
            }}
        >
            { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, initialState, useAppContext }