import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, ChartsContainer, Loading } from "../../components";

const Stats = ()=>{

    const { isLoading, showStatsOperation, monthlyApplications } = useAppContext();

    useEffect(()=>{
        showStatsOperation()
    }, []);

    if(isLoading){
        return <Loading center />
    }

    return(
        <>
            <h1>Resumen de actividad</h1>
            <StatsContainer />
            
        </>
    );
}

export default Stats;