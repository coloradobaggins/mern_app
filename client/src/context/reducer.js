import { initialState } from './appContext';
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
            LOGOUT_USER
        } from './actions';

const reducer = (state, action)=>{

    if(action.type === DISPLAY_ALERT){
        return{
            ...state,
            showAlert: true,
            alertText: 'Completar todos los campos!',
            alertType: 'danger',
        }
    }

    if(action.type === CLEAR_ALERT){
        return {
            ...state,
            showAlert: false,
            alertText: '',
            alertType: ''
        }
    }

    if(action.type === REGISTER_USER_BEGIN){
        return{
            ...state,
            isLoading: true
        }
    }

    if(action.type === REGISTER_USER_SUCCESS){
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Usuario creado! Redireccionando..'
        }
    }

    if(action.type === REGISTER_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if(action.type === LOGIN_USER_BEGIN){
        return {
            ...state,
            isLoading: true
        }
    }

    if(action.type === LOGIN_USER_SUCCESS){
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Usuario LOGUEADO! Redireccionando..'
        }
    }

    if(action.type === LOGIN_USER_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if(action.type === TOGGLE_SIDEBAR){
        return {
            ...state,
            showSidebar: !state.showSidebar //Set the oposite value of showSidebar from state values
        }
    }

    if(action.type === LOGOUT_USER){
        return{
            ...initialState,
            user: null,
            token: null,
            userLocation: '',
            jobLocation: ''
        }
    }

    throw new Error(`No existe el tipo de accion: ${action}`);
}

export default reducer;