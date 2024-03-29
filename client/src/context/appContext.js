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
        HANDLE_CHANGE,
        CREATE_OP_BEGIN,
        CREATE_OP_SUCCESS,
        CREATE_OP_ERROR,
        GET_OP_BEGIN,
        GET_OP_SUCCESS,
        GET_OP_ERROR,
        SET_EDIT_OP,
        CLEAR_FORM_VALUES,
        DELETE_OP_BEGIN,
        UPDATE_OP_BEGIN,
        UPDATE_OP_SUCCESS,
        UPDATE_OP_ERROR,
        SHOW_STATS_BEGIN,
        SHOW_STATS_SUCCESS,
        CLEAR_FILTERS
    } from './actions';


/**
 * TODO:: CLEAR VALUES ! 
 */


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
    shipStatusOptions: ['Underway','Arrived', 'Departed'],
    operations: [],                                 //Operaciones totaales del user
    totalOperations: 0,                             //Cant operaciones
    opPages: 1,                                     //Paginas a mostrar
    cantPages: 1,                                   //Pagina a mostrar por default
    statsOp: {},                                    //Operations stats
    monthlyOp: [],
    filterShip: '',
    filterShipStatus: 'all',
    filterTypeOp: 'all',
    filterDateSort: 'latest'
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

    const handleChange = ({name, value})=>{

        
        //console.log(`Desde appContext: name: ${name} | value: ${value}`);

        dispatch({type:HANDLE_CHANGE, payload:{name, value} });
        

    }

    const addOperation = async(opData) =>{
        console.log(`-------------->>> opData <<<<--------------`)
        console.log(opData);

        console.log(`-------------->>> state <<<<--------------`)
        console.log(state);

        dispatch({ type: CREATE_OP_BEGIN });

        //En el state estan los valores de los desplegables. y de todo

        let { client, ship, products, operationLocation, typeOp, shipStatus } = state;

        let body = {
            client,
            ship,
            products,
            operationLocation,
            type: typeOp,
            shipStatusOptions: shipStatus
        }

        console.log(`-------------->>> body axios <<<<--------------`)
        console.log(body);

        try{

            const rawData = await axios.post('/api/v1/operations/op', body, {
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

    const getOperations = async(qParams)=> {

        dispatch({type: GET_OP_BEGIN});

        try{

            const rawData = await axios.get('/api/v1/operations/op?status=Todos&type=Todos&ship=n&sort=oldest', {
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

    const setEditOperation = (idOp) => {
        console.log(`Modificar operacion id: ${idOp}`);

        dispatch({
            type: SET_EDIT_OP,
            payload: {
                idOp
            }
        })

    }

    //TODO:: VER PORQUE NO ACTUALIZA, PORQUE NO LLEGA EL ID AL CONFIRMAR EDITAR.



    // (Todo los valores estan en el state!)
    const editOperation = async (idOp) => { //Este id tambien existe en el state!
        console.log(`request to edit job!!`);
        
        dispatch({ type: UPDATE_OP_BEGIN });

        const { ship, client, shipStatusOptions } = state;

        let body = {
            ship,
            client,
            shipStatusOptions
        }

        console.log(`EDIT OP -> id: ${idOp} <--`)
        console.log(`Body Update: `);
        console.log(body);

        try{

            const rawUpdateRes = await axios.patch(`/api/v1/operations/${idOp}`, body, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            });

            dispatch({ type: UPDATE_OP_SUCCESS });
            dispatch({ type: CLEAR_FORM_VALUES });

            //TODO:: CONTINUAR EDIT!, 155

        }catch(err){
            console.log(err);
            dispatch({ 
                type: UPDATE_OP_ERROR,
                payload:{
                    msg: err.response.data.msg
                }
            });
        }

    }

    const deleteOperation = async(idOp)=> {
        console.log(`Eliminar operacion id: ${idOp}`);

        dispatch({ type: DELETE_OP_BEGIN });

        try{

            const rawDelete = await axios.delete(`/api/v1/operations/${idOp}`,{
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            });

            console.log(rawDelete);

            getOperations(); //Volvemos a traer todas las operaciones luego de borrar una.

        }catch(err){
            console.log(err);
        }

    }

    const clearFormValues = () => {
        dispatch({
            type: CLEAR_FORM_VALUES
        })
    }

    const showStatsOperation = async()=> {
        console.log(`show operation stats`);
        
        dispatch({ type: SHOW_STATS_BEGIN });

        try{

            const rawResponse = await axios.get('/api/v1/operations/stats', {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            });

            const {opStats, monthlyOp, formattedDate} = rawResponse.data;

            dispatch({ 
                type: SHOW_STATS_SUCCESS,
                payload: 
                {
                    stats: opStats,
                    monthlyOp:monthlyOp
                }
            });

            console.log(`stats...:`);
            console.log(rawResponse.data);

        }catch(err){
            console.log(`Error getting stats...`);
            console.log(err);
            //logoutuser!
        }

    }

    const clearFilters = ()=> {
        console.log(`Clear Filters!`);

        dispatch({
            type: CLEAR_FILTERS 
        });
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
                handleChange,
                addOperation,
                getOperations,
                setEditOperation,
                editOperation,
                deleteOperation,
                clearFormValues,
                showStatsOperation,
                clearFilters
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