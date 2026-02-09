const { imageService, showByIdService, deleteByIdService } = require("../service/imageService");
const AppError = require("../utilities/appError");

async function imageController(req, res){
    try{
        console.log("req.file:", req.file); // 👈 Debug log

        const product = await imageService({
            productName : req.body.productName,
            imagePath : req.file?.path,
            description : req.body.description,
            price : req.body.price,
            category : req.body.category,
            inStock : req.body.inStock === 'True'
        })
        return res.status(201).json({
            success : true,
            message : 'successfully created the product',
            error : {},
            data : product
        })
    }catch(error){
        if( error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                message : error.message,
                data : {},
                error : error
            })
        }
        console.log(error)
        return res.status(500).json({
            success : false,
            message : 'something went wrong',
            data : {},
            error : error
        })
    }

}
async function showById(req,res) {
    try{
        const getProduct = await showByIdService(req.params.id)
        return res.status(200).json({
            success : true,
            error : {},
            data : getProduct,
            message : "the data"        
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                error : error,
                data : {},
                message : error.message        
            })
        }
        console.log(error)
        return res.status(500).json({
            success : false,
            error : error,
            data : {},
            message : 'something went wrong'        
        })
        
    }
}

async function deleteById(req,res) {
    try{
        const getProduct = await deleteByIdService(req.params.id)
        return res.status(200).json({
            success : true,
            error : {},
            data : getProduct,
            message : "data deleted"        
        })
    }catch(error){
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success : false,
                error : error,
                data : {},
                message : error.message        
            })
        }
        console.log(error)
        return res.status(500).json({
            success : false,
            error : error,
            data : {},
            message : 'something went wrong'        
        })
        
    }

}

module.exports = {
    imageController,
    showById,
    deleteById
}