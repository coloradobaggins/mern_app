import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, ChartsContainer, Loading } from "../../components";

const Stats = ()=>{

    const { isLoading, showStatsOperation, monthlyOp } = useAppContext();

    useEffect(()=>{
        showStatsOperation()
        console.log(`monthlyOp:`, monthlyOp);
    }, []);

    if(isLoading){
        return <Loading center />
    }

    return(
        <>
            <h1>Estadísticas</h1>
            <StatsContainer />
            {monthlyOp.length > 0 && <ChartsContainer/>}
        </>
    );
}

export default Stats;