import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import connectDB from './db/connect.js';
import Operation from './models/Operation.js';

dotenv.config();

const start = async ()=> {
    try{

        await connectDB(process.env.MONGO_URL);
        await Operation.deleteMany();

        const file = await readFile(new URL('./MOCK_DATA.json', import.meta.url));
        const jsonOperations = JSON.parse(file);
        await Operation.create(jsonOperations);
        console.log('Mock data loaded');

    }catch(error){
        console.log('Mock data - ERROR');
        console.log(error);
    }
}

start();