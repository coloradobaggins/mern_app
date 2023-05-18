import React, {useState} from "react";
import { useAppContext } from "../context/appContext";
import TheAreaChart from "./AreaChart";
import BarraChart from "./BarChart";
import Wrapper from "../assets/wrappers/ChartsContainer"

const ChartsContainer = ()=>{
    const [areaChart, setAreaChart] = useState(true);
    const {monthlyOp} = useAppContext();

    return(
        <Wrapper>
            <h1>ChartsConainter</h1>
            <button type='button' onClick={()=>setAreaChart(!areaChart)}>
                {areaChart ? 'Grafico Barras' : 'Grafico Area'}
            </button>
            
            {areaChart ? <TheAreaChart data={ monthlyOp } /> : <BarraChart data={ monthlyOp }/>}
            
        </Wrapper>
    );
}
export default ChartsContainer