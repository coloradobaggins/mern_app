import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({children}) => {
    //Ruta protegida.
    //Si no tengo al user en mi estado, lo saco a la landing

    const { user } = useAppContext();

    if(!user){
        return <Navigate to='/landing' />
    }

    return children
}

export default ProtectedRoute;