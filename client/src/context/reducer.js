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

    if (action.type === LOGOUT_USER) {
        return{
            ...initialState,
            user: null,
            token: null,
            userLocation: '',
            jobLocation: ''
        }
    }

    if (action.type === UPDATE_USER_BEGIN) {
        return{
            ...state,
            isLoading: true
        }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Perfil actualizado!'
        }
    }

    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === HANDLE_CHANGE) {
        console.log(action)
        
        return {
            ...state,
            [action.payload.name]: action.payload.value    //Access dynamically property name and value

        }
        
    }

    if (action.type === CREATE_OP_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === CREATE_OP_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Operacion creada'
        }
    }

    if (action.type === CREATE_OP_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === GET_OP_BEGIN ) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === GET_OP_SUCCESS) {

        // console.log(`reducer: payload get op:`)
        // console.log(action.payload)

        return {
            ...state,
            isLoading: false,
            operations: action.payload.operations,
            totalOperations: action.payload.cantOperations,
            cantPages: action.payload.cantPages
        }
    }

    if (action.type === SET_EDIT_OP) {
        // Buscar el array de operaciones en el state:
        const operation = state.operations.find(o => o._id === action.payload.idOp);
        const { _id, client, ship, products, operationLocation, type } = operation;
        //update the state:
        return {
            ...state,
            isEditing: true,
            opEditingId: _id,
            client, 
            ship, 
            products, 
            operationLocation, 
            type
        }
    }

    if (action.type === CLEAR_FORM_VALUES) {

        const initialState = {
            client: '',
            ship: '',
            isEditing: false,
            idOperationEdit: '',
            operationLocation: state.userLocation || ''
        }

        return {
            ...state,
            ...initialState
        }
    }

    if(action.type === DELETE_OP_BEGIN){
        return {
            ...state,
            isLoading: true
        }
    }

   if(action.type === UPDATE_OP_BEGIN){
    return {
            ...state,
            isLoading: true
        }
   }

   if(action.type === UPDATE_OP_SUCCESS){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Operacion actualizada!'
        }
   }

   if(action.type === UPDATE_OP_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
   }

   if(action.type === SHOW_STATS_BEGIN){
        return {
            ...state,
            isLoading: true,
            showAlert: false,
        }
   }

   if(action.type === SHOW_STATS_SUCCESS){
        return {
            ...state,
            isLoading: false,
            statsOp: action.payload.stats,
            monthlyApplications: action.payload.monthlyApplications
        }
   }

    throw new Error(`No existe el tipo de accion: ${action}`);
}

export default reducer;