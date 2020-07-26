// if(process.env.NODE_ENV != 'production'){
//     require('dotenv').config({ path: '.env' })
// }

// const mongoose =  require('mongoose')
// mongoose.connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true ,
//     useCreateIndex:true
// })
// mongoose.set('useCreateIndex', true);

// const db =  mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', ()=> console.log('connected to mongoose'))
mongoose.connect("mongodb+srv://user:RnAUoPJKuL2lvdzu@cluster0.hpxkr.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err)); 
mongoose.set('useCreateIndex', true);

