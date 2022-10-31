import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';

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

    throw new Error(`No existe tal accion: ${action}`);
}

export default reducer;