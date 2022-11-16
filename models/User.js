import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, 'El nombre de usuario es requerido'],
        minlength: 3,
        maxlength: 20,
        trim:true,
    },
    email:{
        type:String,
        required:[true, 'El email de usuario es requerido'],
        validate:{
            validator:validator.isEmail,
            message: 'EL mail debe ser valido'
        },
        unique: true
    },
    password:{
        type:String,
        required:[true, 'La contraseña de usuario es requerido'],
        minlength: 5,
        select: false   //Por default no sera devuelt en el documento
    },
    lastName:{
        type:String,
        maxlength: 20,
        trim:true,
        default: 'lastName'
    },
    location:{
        type:String,
        maxlength: 20,
        trim:true,
        default: 'ciudad'
    },

});

/**
 * .save/.create in document executes .pre method ...' (Not executed on findeOne, findOneAndUpdate, etc)
 *  ( Password is set to select: false ) it will be undefined on create 
 * 
 */ 
UserSchema.pre('save', async function(){  
    
    console.log(this.modifiedPaths());      //Devuelvo los campos modificados en save()
    console.log(this.isModified('name'));   //Check for modified field
    
    if(this.isModified('password')){

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    

    //console.log(this.password);

});

//Custom method
UserSchema.methods.createJWT = function(){
    //console.log(this);  // this represents our documentModel
    return jwt.sign(
        { userId:this._id }, 
        process.env.JWT_SECRET, 
        { expiresIn:process.env.JWT_LIFETIME }
    );
}

UserSchema.methods.comparePassword = async function(userPass){
    const isMatch = await bcrypt.compare(userPass, this.password);
    return isMatch;
}

export default mongoose.model('User', UserSchema);