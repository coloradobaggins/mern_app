import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import cors from 'cors';
//Routers
import authRouter from './routes/auth.routes.js';
import operationRouter from './routes/operations.routes.js'
//Middlewares
import notFound from './middlewares/not-found.js';
import errorHandler from './middlewares/error-handler.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

/*
app.get('/', (req, res)=>{
    //throw new Error('Error!');    //Send to errorHandler middleware
    res.json({msg: 'Hey working!'});

});
*/

app.get('/api/v1', (req, res)=>{
    res.json({msg: 'Hey working!'});
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/operations', operationRouter);

//Error middlewares
app.use(notFound);          //404
app.use(errorHandler);      //500

const init = async()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        const server = app.listen(PORT, ()=> console.log(`Listening on ${server.address().port}`)); //Start listtening if we are connected to db

    }catch(err){
        console.log(err)
    }

}

init();