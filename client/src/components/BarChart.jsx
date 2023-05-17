import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const ChartBar = ({data})=>{
    console.log(`data: `,data);
    return(
        <ResponsiveContainer width="100%" height={300}>
            <BarChart 
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="d" />
                <YAxis allowDecimals={false}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" barSize={75}/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default ChartBar;