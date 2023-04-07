import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({numStat, label, icon, color, bg})=>{
    //Paso color al styled component wrapper color={color}, desde las props
    return(
        <Wrapper color={color} bg={bg}>
            <header>
                <span className="numStat">{numStat}</span>
                <span className="icon">{icon}</span>
            </header>
            <h5 className="label">{label}</h5>
        </Wrapper>
    );
}
export default StatItem