import Operation from '../models/Operation.js';
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js';

const createOp = async(req, res)=>{

    const {client, ship, products, operationType } = req.body;
    
    if(!client || !ship || !products)
        throw new BadRequestError('Faltan campos obligatorios para dar de alta una operacion');

    req.body.createdBy = req.user.userId;           // From authenticate middleware
    req.body.type = operationType;

    console.log(`CreateOp: req.body: `);
    console.log(req.body);

    const operation = await Operation.create(req.body);

    res.status(201).json([
        operation
    ]);

}

//Get Operations by User id created.
const getAllOp = async(req, res)=>{
    
    const { userId } = req.user;

    console.log(`GetOperations, userid: ${userId}`);

    const operations = await Operation.find({ createdBy: userId });

    res.status(200).json({
        operations,
        cantOperations: operations.length,
        cantPages: 1
    });

}

const deleteOp = async(req, res)=>{
    const { id: idOp } = req.params;
    res.send(`Delete op id: ${id}`);
}


const updateOp = async(req, res)=>{
    const { id: idOp } = req.params;
    const { client, ship, product } = req.body;
    let response = {};

    console.log(`------> PATCH UPDATE OPERATION ${idOp} <------`);

    
    if(!client || !ship)
        throw new BadRequestError('Faltan campos obligatorios para actualizar operacion');

    

    try{

        const operation = await Operation.findOne({_id: idOp});

        if(!operation){
            throw new NotFoundError(`No se encontro operacion con este id: ${idOp}`);
        }

        const operationUpdate = await Operation.findOneAndUpdate({_id: idOp}, req.body, {
            new:true, //return new updated values
            runValidators: true //runs validator on passed values
        });

        response.stastus = 'success';
        response.updated = operationUpdate;

    }catch(err){
        console.log('------> Error al actualizar: ', err);
        response.status = 'Error'
        response.error = err?.message;
    }
    

    res.status(200).json(response);
}

const showStats = async(req, res)=>{
    res.send(`Show ops stats`);
}

export { createOp, deleteOp, getAllOp, updateOp, showStats }