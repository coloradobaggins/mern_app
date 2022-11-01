const errorHandler = (err, req, res, next)=>{
    console.log(`errorHandler...`);
    //console.log(err);

    //Default error
    const defaultError = {
        statusCode: err.statusCode || 500,              //Comes from CustomApiError statusCode? Else...Internal Server Error
        msg: err.message || 'Algo salio mal... '        //Message from err (present) or Default error message
    }

    //Mongo Error's
    if(err.name === 'ValidationError'){                 //Required fields error
        defaultError.statusCode = 400;                  //Bad Request
        defaultError.msg = err.message
        //defaultError.msg = Object.values(err.errors).map((item)=>item.message).join(', ');
    }

    
    if(err.code && err.code===11000){                   //Unique email error
        defaultError.statusCode = 400;
        defaultError.msg = `${Object.keys(err.keyValue)} tiene que ser unico!`;
    }

    
    //res.status(500).send({ msg: 'we have an error...', err });

    res.status(defaultError.statusCode).json({
        msg: defaultError.msg
    });
}

export default errorHandler;