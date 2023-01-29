import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import Operation from './Operation';
import Wrapper from '../assets/wrappers/OperationsContainer';

const OperationsContainer = ()=> {

    const { isLoading, operations, totalOperations, opPages, getOperations } = useAppContext();

    useEffect(()=>{

        getOperations();

    }, []);

    if(isLoading){
        //alert("BUSCANDO OPERACIONES");
        return <Loading center/>
    }

    if(operations.length === 0){
        return <Wrapper>
            <h3>No hay operaciones cargadas</h3>
        </Wrapper>
    }

    return(
        <Wrapper>
            <h2>Operaciones encontradas: {totalOperations}</h2>

            <div className='operations'>
                {
                    operations.map((op)=>{
                        return <Operation 
                                    key={op._id} 
                                    id={op._id}
                                    shipName={op.ship}
                                    client={op.client}
                                    products={op.products}
                                    type={op.type}
                                    operationLocation={op.operationLocation}
                                    createdAt={op.createdAt} 
                                />
                    })
                }
            </div>
        </Wrapper>
        
    )
}

export default OperationsContainer;