const createOp = async(req, res)=>{
    res.send(`Create operation`);
}

const deleteOp = async(req, res)=>{
    const { id } = req.params;
    res.send(`Delete op id: ${id}`);
}

const getAllOp = async(req, res)=>{
    res.send(`Get all op`);
}

const updateOp = async(req, res)=>{
    const { id } = req.params;
    res.send(`Update op id: ${id}`);
}

const showStats = async(req, res)=>{
    res.send(`Show ops stats`);
}

export { createOp, deleteOp, getAllOp, updateOp, showStats }