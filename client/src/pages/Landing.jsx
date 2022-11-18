
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <Wrapper>
                <nav>
                    <Logo />
                </nav>
                <div className='container page'>
                <div className='info'>
                    <h1>Share<span>Marine</span></h1>
                    <p>
                        Bienvenido al sistema de gestion de operaciones para el agente maritimo!
                    </p>
                    <Link to="/register" className='btn btn-hero btn-landing'>Ingresar-Registrarse</Link>
                </div>
             </div>
        </Wrapper>
    )
}

export default Landing;