import Wrapper from '../assets/wrappers/OperationInfo';

const OperationInfo = ({icon, text})=>{ 
    return(
        <Wrapper>
            <span className='icon'>{icon}</span>
            <span className='text'>{text}</span>
        </Wrapper>
    )
}

export default OperationInfo;