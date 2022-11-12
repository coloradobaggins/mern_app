import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = ()=>{
    return(
        <Wrapper>
            <nav>
                <Link to='add-operation'>Add Operations</Link>
                <Link to='all-operations'>All Operations</Link>
            </nav>
            <Outlet />
        </Wrapper>
    );
}

export default SharedLayout;