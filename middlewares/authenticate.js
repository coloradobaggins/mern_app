import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from "../errors/index.js";

const authenticate = async (req, res, next)=> {
    console.log(`*** authenticate user ***`);
    
    //const headers = req.headers;
    const authorization = req.headers.authorization;
    //console.log(headers);
    //console.log(authorization);

    //Si no tenemos header auth, throw error

    if(!authorization || !authorization.startsWith('Bearer')){
        throw new UnauthenticatedError('Autenticacion invalida');
    }

    const token = authorization.split(' ')[1];

    try{

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`payload: `);
        console.log(payload);

        //Obtengo el userId, ver user model createJWT()
        //Dejo accesible el userId para los controllers
        req.user = {
            userId: payload.userId
        }

        console.log(`req.user: `);
        console.log(req.user);

        next();

    }catch(err){

        console.log(err);
        throw new UnauthenticatedError('Autenticacion invalida');

    }

    
}

export default authenticate;