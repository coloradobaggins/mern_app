import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const TheAreaChart = ({data})=>{
    
    return(
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="d" />
                <YAxis />
                <Tooltip />
                <Area dataKey="count" type="monotone" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default TheAreaChart;