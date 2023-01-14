import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Operation';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import OperationInfo from './OperationInfo';

const Operation = ({id, shipName, client, products, type, operationLocation, createdAt})=> {
    
    const {modifyOperation, deleteOperation} = useAppContext();

    let date = moment(createdAt);
    date = date.format('DD-MM-YYYY');

    return(
        <Wrapper>
            <header>
                <div className="main-icon">{shipName.charAt(0)}</div>
                <div className='info'>
                    <h4><span>{shipName}</span></h4>
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
                <button type='buttton' className='btn edit-btn' onClick={()=> modifyOperation(id)}>Editar</button>

                <Link to='/add-operation' className='btn edir-btn' onClick={()=> modifyOperation(id)}>Editar</Link>
                <button type='buttton' className='btn delete-btn' onClick={()=> deleteOperation(id)}>Eliminar</button>
                <p>Creado: {date}</p>
            </div>

        </Wrapper>
        
        
    );
}

export default Operation;