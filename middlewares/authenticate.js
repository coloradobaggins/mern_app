import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from "../errors/index.js";

const authenticate = async (req, res, next)=> {
    console.log(`*** authenticate user ***`);

    //{{token}}-> postman
    
    //const headers = req.headers;
    const authorization = req.headers.authorization;
    //console.log(headers);
    //console.log(authorization);

    //Si no tenemos header auth, throw error

    if(!authorization || !authorization.startsWith('Bearer')){
        console.log(`no authorization or no jwt token correctly formed`);
        throw new UnauthenticatedError('Autenticacion invalida');
    }

    const token = authorization.split(' ')[1];

    let response = {
        status: 200,
        msg: 'ok'
    }
    
    
    try{

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`payload: `);
        console.log(payload);

        //Obtengo el userId, ver user model createJWT()
        //Dejo accesible el userId para los controllers
        req.user = {
            userId: payload.userId  //(from user model)
        }

        console.log(`req.user: `);
        console.log(req.user);

        next();

    }catch(err){

        console.log(err);
        console.log(`no jwt token`);

        response.status = 500;
        response.msg = err.message;

        throw new UnauthenticatedError('Autenticacion invalida');
    }
    

    
}

export default authenticate;