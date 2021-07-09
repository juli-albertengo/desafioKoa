const Router = require('koa-router');
const productModel = require('./productModel');

const router = new Router({
    prefix: '/products'
})

router.get('/', async(ctx, next) => {
    try {
        const products = await productModel.find({})
        if(products === null || products === []){
            ctx.body = {
                msg: []
            };
        } else {
            ctx.body = {
                msg: products
            }
        }
    } catch(error) {
        ctx.body = {
            msg: `There has been an error fetching the products => ${error}`
        }
    }
    next();
})

router.get('/:id', async(ctx, next) => {
    let productId = ctx.params.id
    try{
        const product = await productModel.findOne({_id: productId});
        if(!product){
            ctx.body = {
                msg: {}
            }
        } else {
            ctx.body = {
                msg: product
            }
        }
    } catch (error) {
        ctx.body = {
            msg: `There has been an error fetching the product => ${error}`
        }
    }
    next()
})

router.post('/', async(ctx, next) => {
    if(
        !ctx.request.body.name,
        !ctx.request.body.category,
        !ctx.request.body.description,
        !ctx.request.body.foto,
        !ctx.request.body.price
    ){
        ctx.response.status = 400;
		ctx.body = {
			msg: 'Please enter the data'
        }
    } else {
        const product = {
            name: ctx.request.body.name,
            category: ctx.request.body.category,
            description: ctx.request.body.description,
            foto: ctx.request.body.foto,
            price: ctx.request.body.price
        }
        let productToSave = new productModel(product);
        try{
            const savedProduct = await productToSave.save();
            ctx.body = {
                msg: savedProduct
            }
        } catch (error) {
            ctx.body = {
                msg: `There has been an error saving the product => ${error}`
            }
        }
    }
    next();
})

router.put('/:id', async(ctx, next) => {
    let productId = ctx.params.id
    const updatedProduct = {
        name: ctx.request.body.name,
        category: ctx.request.body.category,
        description: ctx.request.body.description,
        foto: ctx.request.foto,
        price: ctx.request.price
    }
    try{
        const productUpdated = await productModel.updateOne({_id: productId}, {$set: updatedProduct});
        if (!productUpdated){
            ctx.body = {
                msg: {}
            }
        } else {
            ctx.body = {
                msg: productUpdated
            }
        }
    } catch(error){
        ctx.body = {
            msg: `There has been an error updating the product => ${error}`
        }
    }
    next()
})

router.delete('/:id', async(ctx, next) => {
    let productId = ctx.params.id
    try {
        let deletedProduct = await productModel.deleteOne({_id: productId});
        if(!deletedProduct){
            ctx.body = {
                msg: {}
            }
        } else {
            ctx.body = {
                msg: deletedProduct
            }
        }
    } catch (error) {
        ctx.body = {
            msg: `There has been an error deleting the product => ${error}`
        }
    }
    next();
})


module.exports = router;