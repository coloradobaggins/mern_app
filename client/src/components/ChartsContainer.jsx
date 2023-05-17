import React, {useState} from "react";
import { useAppContext } from "../context/appContext";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
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
            
            {areaChart ? <AreaChart data={ monthlyOp } /> : <BarChart data={ monthlyOp }/>}
            
        </Wrapper>
    );
}
export default ChartsContainer