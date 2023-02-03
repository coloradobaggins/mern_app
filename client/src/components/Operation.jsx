import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Operation';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import OperationInfo from './OperationInfo';

const Operation = ({id, shipName, client, products, type, operationLocation, createdAt})=> {
    
    const {setEditOperation, deleteOperation} = useAppContext();

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
                <div className='content-center'>
                    <OperationInfo icon={<FaLocationArrow />} text={operationLocation} />
                    <OperationInfo icon={<FaCalendarAlt />} text={date} />
                    <OperationInfo icon={<FaBriefcase />} text={type} />
                    <div className={`status pending`}>Pendiente</div>
                </div>
                <ul>
                    <li>Tipo de operacion: <span>{type}</span></li>
                    <li>Lugar: {operationLocation}</li>
                    <li>Productos: {products}</li>
                </ul>
            </div>
            <div className='footerOp'>
                <Link 
                    to='/add-operation'
                    className='btn edit-btn'
                    onClick={()=> setEditOperation(id)}
                >
                    Editar
                </Link>
                <button type='buttton' className='btn delete-btn' onClick={()=> deleteOperation(id)}>Eliminar</button>
                <p>Creado: {date}</p>
            </div>

        </Wrapper>
        
        
    );
}

export default Operation;