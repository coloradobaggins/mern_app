import User from '../models/User.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';


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

            user:{
                name: user.name,
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                
            },
            token
            
        });

    }catch(err){
        console.log(err);
        //res.status(500).json({msg:'Se produjo un error'});
        next(err);  //Catch the error on next middleware (error-handler)
    }

}

const login = async(req, res)=>{

    const {email, password} = req.body;

    console.log(`Estamos en server/login. datos: ${email} - ${password}`);
    
    if(!email || !password){
        throw new BadRequestError('Todos los campos son obligatorios');
    }

    const user = await User.findOne({email}).select('+password');   // (Override/force selected false in user document)

    if(!user){
        throw new UnauthenticatedError('Datos incorrectos');
    }

    console.log(user);

    const checkPassword = await user.comparePassword(password);

    if(!checkPassword){
        throw new UnauthenticatedError('Datos incorrectos');
    }

    const token = user.createJWT();
    user.password = undefined;      //No devolver el pass en la respuesta

    res.status(200).json({user, token});
}

const updateUser = async(req, res)=>{

    const {name, lastName, location } = req.body;

    if(!name || !lastName || !location){
        throw new BadRequestError('Todos los campos son obligatorios para el user update');
    }

    console.log(`on update user: `);
    const userId = req.user.userId;

    const user = await User.findOne({_id: userId});

    //console.log(user);
    
    user.name = name;
    user.lastName = lastName;
    user.location = location;

    await user.save();

    const token = user.createJWT();

    res.status(200).json({
        token,
        user
    })
}

export { register, login, updateUser }