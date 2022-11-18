import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, SidebarSmall, SidebarBig } from "../../components";
//EN esta pagina, dashboard, se renderizan operaciones, agregar operacion y perfil.
const SharedPage = ()=>{
    return(
        <Wrapper>

            <main className="dashboard">
                
                <SidebarSmall />
                <SidebarBig />

                <div>

                    <Navbar />

                    <div className="dashboard-page">

                        {/** <Outlet /> permite que se renderice las pages del dashboard, en este div (dashboard-page).
                         * Las secciones que comparten la vista en dashboar
                         */}
                        <Outlet />
                    
                    </div>

                </div>

            </main>

            
        </Wrapper>
    );
}

export default SharedPage;