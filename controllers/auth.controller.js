import User from '../models/User.js';

const register = async(req, res)=>{

    try{

        const user = await User.create(req.body);
        res.status(201).json({user});

    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Se produjo un error'});
    }

}

const login = (req, res)=>{
    res.send(`Login user`);
}

const updateUser = (req, res)=>{
    res.send(`updateUser`);
}

export { register, login, updateUser }