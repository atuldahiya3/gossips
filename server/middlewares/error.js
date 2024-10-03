const errorMiddleWare=(err,req,res,next)=>{
    err.message ||= "Interval Server Error";
    err.statusCode ||=500;

    return (res.status(err.statusCode).json({
        success:false,
        message:err.message,
    }))
}

// const TryCatch=()=>async()=>{

// }

export {errorMiddleWare,TryCatch}