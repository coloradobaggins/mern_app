const errorHandler = (err, req, res, next)=>{
    console.log(err);
    res.status(500).send({
        msg: 'we have an error...', 
        err
    });
}

export default errorHandler;