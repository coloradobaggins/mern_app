import mongoose, { mongo } from 'mongoose';

const OperationSchema = new mongoose.Schema({

    client: {
        type: String,
        required: [true, 'El cliente es obligatorio'],
        maxlength: 60
    },
    ship: {
        type: String,
        required: [true, 'El nombre del buque es obligatorio'],
        maxlength: 60
    },
    products:{
        type: [String],
        required: [true, 'Los productos de la operacion son obligatorios']
    },
    type: {
        type: String,
        enum: ['carga', 'descarga'],
        default: 'carga'
    },
    operationLocation: {
        type: String,
        required: true,
        default: 'ciudad'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio']
    }

}, {timestamps: true});

export default mongoose.model('Operation', OperationSchema);