
import main from '../assets/images/main.svg';
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
                    <h1>Title name <span>App</span></h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo.
                    </p>
                    <Link to="/register" className='btn btn-hero'>Ingresar-Registrarse</Link>
                </div>
             </div>
             <img src={main} alt='presentation img' className='img main-img' />
        </Wrapper>
    )
}

export default Landing;