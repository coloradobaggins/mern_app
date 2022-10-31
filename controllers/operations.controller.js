const createOp = async(req, res)=>{
    res.send(`Create op`);
}

const deleteOp = async(req, res)=>{
    res.send(`Delete op`);
}

const getAllOp = async(req, res)=>{
    res.send(`Get all op`);
}

const updateOp = async(req, res)=>{
    res.send(`Update op`);
}

const showStats = async(req, res)=>{
    res.send(`Show op`);
}

export { createOp, deleteOp, getAllOp, updateOp, showStats }