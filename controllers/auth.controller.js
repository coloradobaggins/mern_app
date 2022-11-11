import User from '../models/User.js';
import {BadRequestError} from '../errors/index.js';


const register = async(req, res, next)=>{

    const { name, email, password } = req.body;

    try{

        if(!name || !email || !password){
            //throw new Error(`Faltan campos requeridos`);
            throw new BadRequestError(`Faltan campos obligatorios...`);
        }

        const emailExists = await User.findOne({email: email});
        if(emailExists){
            throw new BadRequestError(`Email ya registrado...`);
        }

        const user = await User.create(req.body);
        const token = user.createJWT();

        res.status(201).json({
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token
        });

    }catch(err){
        console.log(err);
        //res.status(500).json({msg:'Se produjo un error'});
        next(err);  //Catch the error on next middleware (error-handler)
    }

}

const login = (req, res)=>{
    res.send(`Login user`);
}

const updateUser = (req, res)=>{
    res.send(`updateUser`);
}

export { register, login, updateUser }