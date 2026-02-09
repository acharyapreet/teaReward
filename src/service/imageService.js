const cloudinary = require('../config/cloudinaryConfig')
const fs = require('fs/promises')
const { createProduct, findId, deleteId } = require('../repository/productRepository')
const InternalServerError = require('../utilities/internalServerError')
const BadRequestError = require('../utilities/badRequestError')
const NotFoundError = require('../utilities/notFoundError')

async function imageService(productDetails){
    //1. we should check if an image is coming to create the product, then we should first upload it to cloudinary

    const imagePath = productDetails.imagePath
    if(imagePath){
         try{
             const cloudinaryResponse = await cloudinary.uploader.upload(imagePath)
             var productImageUrl = cloudinaryResponse.secure_url
             await fs.unlink(imagePath)

         }catch(error){
             console.log(error)
             throw new InternalServerError()
         }
    }

    //2. Then use url from cloudinary and other product details to add product in database
    const product = await createProduct({
        ...productDetails,
        productImage: productImageUrl
    })

    return product

}

async function showByIdService(id) {
    const product = await findId(id)
    if(!product){
        throw new NotFoundError('Product')
        // throw{reason : "not able to find product", statusCode : 404}
    }
    return product
}
async function deleteByIdService(id) {
    const product = await deleteId(id)
    if(!product){
        throw new NotFoundError('Product')
    }
    return product
}

module.exports = {
    imageService,
    showByIdService,
    deleteByIdService
}