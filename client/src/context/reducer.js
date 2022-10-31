import { DISPLAY_ALERT } from './actions';

const reducer = (state, action)=>{
    if(action.type === DISPLAY_ALERT){
        return{
            ...state,
            showAlert:true,
            alertText: 'Completar todos los campos!',
            alertType: 'danger',
        }
    }

    throw new Error(`No existe tal accion: ${action}`);
}

export default reducer;