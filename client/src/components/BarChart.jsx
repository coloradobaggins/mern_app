const BarChart = ({data})=>{
    return(
        <div>
            <h2>Bar Chart</h2>
            {data.map((el, i)=>{
                return <p>{el._id.y}</p>
            })}
        </div>
    )
}

export default BarChart;