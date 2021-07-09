const Koa = require('koa');
const KoaBody = require('koa-body');
const mongoConnection = require('./mongoConnection');

const app = new Koa();

app.use(KoaBody());

let products = require('./products.js');

app.use(products.routes());

const server = app.listen(8080, async()=> {
    try {
        const connection = await mongoConnection()
        if(connection != `Mongo DB Connection established`){
            console.log(`${connection}`);
        } else {
            console.log(`Koa server listening on ${server.address().port}`);
        }
    } catch (error){
        console.log(`Error starting server => ${error}`);
    }

})

server.on('error', error =>  console.log(`Error on server => ${error}`));

