import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = mongoose.Schema({

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

export default mongoose.model('User', UserSchema);