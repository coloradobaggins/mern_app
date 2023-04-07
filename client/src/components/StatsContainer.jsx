import { useAppContext } from "../context/appContext";
import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer";
import { FaShip } from "react-icons/fa";
import { GiShipBow, GiCargoShip } from "react-icons/gi"

const StatsContainer = ()=>{
    
    const { statsOp } = useAppContext();

    const defStats = [
        {
            numStat: statsOp.Arrived || 0,
            label: 'Arrived',
            icon: <GiShipBow />,
            color: '#e95449',
            bg: '#fcdcc7'
        },
        {
            numStat: statsOp.Departed || 0,
            label: 'Departed',
            icon: <FaShip />,
            color: '#49e964',
            bg: '#c7fcd4'
        },
        {
            numStat: statsOp.Underway || 0,
            label: 'Underway',
            icon: <GiCargoShip />,
            color: '#e9b949',
            bg: '#fcefc7'
        },
    ]

    

    return(
        <Wrapper>
            {defStats.map((item, index)=>{
                return <StatItem {...item} key={index}/>
            })}
        </Wrapper>
    );
}
export default StatsContainer