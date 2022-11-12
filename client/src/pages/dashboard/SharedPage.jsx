import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, SidebarSmall, SidebarBig } from "../../components";

const SharedPage = ()=>{
    return(
        <Wrapper>

            <main className="dashboard">
                
                <SidebarSmall />
                <SidebarBig />

                <div>

                    <Navbar />

                    <div className="dashboard-page">

                        <Outlet />
                    
                    </div>

                </div>

            </main>

            
        </Wrapper>
    );
}

export default SharedPage;