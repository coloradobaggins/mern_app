import Operation from '../models/Operation.js';
import { BadRequestError, UnauthenticatedError, NotFoundError } from '../errors/index.js';
import checkPermission from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment/moment.js';
import { format } from 'morgan';

const createOp = async(req, res)=>{

    const {client, ship, products, operationType,  } = req.body;
    
    if(!client || !ship || !products)
        throw new BadRequestError('Faltan campos obligatorios para dar de alta una operacion');

    req.body.createdBy = req.user.userId;           // From authenticate middleware
    //req.body.type = operationType;

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
    let response = {};

    try{

        const operation = await Operation.findOne({_id: idOp});
        if(!operation){
            throw new NotFoundError(`Operacion no encontrada`);
        }

        checkPermission(req.user, operation.createdBy); // Check if user can delete

        const deleteOp = await operation.remove();

        response.status = 'success';
        response.deleted = 'deleted';

    }catch(err){
        console.log(err);
        response.status = 'Error';
        response.error = err?.message;
    }
    
    res.status(200).json(response);
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

        /*
        console.log(req.user.userId);
        console.log(typeof req.user.userId);
        console.log(operation.createdBy);
        console.log(typeof operation.createdAt);
        */

        checkPermission(req.user, operation.createdBy); //Check if user can update...

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

/**
 * Get match operation createdByUser and return count of operationStatusOptions grouped  d
 * @param {*} req request
 * @param {*} res response
 */
const statsOp = async(req, res)=>{

    console.log(`operations stats`);

    let opStats = await Operation.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) }},     //Get all operation created by this user
        { $group: { _id: '$shipStatusOptions', count: { $sum: 1 }}},            // Group them
    ]);

    //Return obj de stats. Ej: 'Arrived: 30'. (not array format)
    let obj = {};
    opStats.map((el, i)=>{
        const {_id, count} = el;
        obj[_id] = count;
        return obj;
    });
    opStats = obj;

    
    /*
    opStats = opStats.reduce((acc, curr)=>{
        const {_id, count} = curr;
        acc[_id] = count;
        return acc
    }, {});
    */

    
    //Default values if the user have not operations created
    opStats.Departed = opStats.Departed || 0;
    opStats.Arrived = opStats.Arrived || 0;
    opStats.Underway = opStats.Underway || 0;
    
    //Monthly operations
    /*
        Cantidad de resgistro: x mes and x year
        Ej:
        {
            "_id": {
                "year": 2023,
                "month": 2
            },
            "count": 48
        },
    */

    let monthlyOp = await Operation.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) }},
        { 
            $group: {
                _id: {
                    y: {
                        $year: '$createdAt' //Year operator, takes the year from date
                    },
                    m: {
                        $month: '$createdAt' //Month operator, takes the month from date
                    }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: {'_id.y': -1, '_id.m': -1}   //Sort desc year & month
        },
        {
            $limit: 5   //Month limit
        }
    ]);

    /*
    const formattedDate = monthlyOp.map((item)=>{
        const { _id: { y, m}, count } = item;
        const d = moment().month(m-1).year(y).format('MMM Y');
        
        return { d, count };
    }).reverse();   // Invierto orden : de Enero (1) a Dic (11)
    */

    //Format monthlyOp Dates and Reverse
    monthlyOp = monthlyOp.map((item)=>{
        const { _id: { y, m}, count } = item;
        const d = moment().month(m-1).year(y).format('MMM Y');
        
        return { d, count };
    }).reverse();   // Invierto orden : de Enero (1) a Dic (11)

    console.log(monthlyOp);

    res.status(200).json({ opStats, monthlyOp });
    
}

export { createOp, deleteOp, getAllOp, updateOp, statsOp }