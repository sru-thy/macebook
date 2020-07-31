if(process.env.NODE_ENV != 'production'){
    require('dotenv').config({ path: '.env' })
}

const mongoose =  require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex:true
})
mongoose.set('useCreateIndex', true);

const db =  mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log('connected to mongoose'))


