import moment from 'moment';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Operation';

const Operation = ({_id, shipName, client, products, type, operationLocation, createdAt})=> {
    
    const {modifyOperation, deleteOperation} = useAppContext();

    let date = moment(createdAt);
    date = date.format('dddd');

    return(
        <Wrapper>
            <header>
                <div className='info'>
                    <h4>Buque: <span>{shipName}</span></h4>
                    <p>({client})</p>
                </div>
            </header>
            <div className='content'>
                <ul>
                    <li>Tipo de operacion: <span>{type}</span></li>
                    <li>Lugar: {operationLocation}</li>
                    <li>Productos: {products}</li>
                </ul>
                
            </div>
            <div className='footerOp'>
                <button type='button' className='btn timelog-btn'>TIMELOG</button>
                <button type='buttton' className='btn edit-btn' onClick={()=> modifyOperation(_id)}>Editar</button>
                <button type='buttton' className='btn delete-btn' onClick={()=> deleteOperation(_id)}>Eliminar</button>
                <p>Creado: {createdAt}</p>
            </div>

        </Wrapper>
        
        
    );
}

export default Operation;