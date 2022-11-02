import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

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

// 'Before we save/create the document run...' (Not executed on findeOne, findOneAndUpdate, etc)
UserSchema.pre('save', async function(){  

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    //console.log(this.password);

});

export default mongoose.model('User', UserSchema);