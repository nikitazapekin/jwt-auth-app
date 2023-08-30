//npm i express mongoose 
// npm i -D  nodemon concurrently
//console.log(1)
//npm i config

/*
const express = require('express')
const config= require('config')
const mongoose = require('mongoose')
const app = express()

app.use('/api/auth', require('./routes/auth.routes'))
app.use(express.json());
//app.use(express.json({extended: true})) // парсер с клиента
const PORT = config.get('PORT') || 5000
async function start(){
try {
   await  mongoose.connect(config.get('mongoUri'), {
//useNewUrlParcer: true,
//useUnifiedTopology: true,
//useCreateIndex: truesasass
})
       app.listen(PORT, ()=> { console.log(`app started ${PORT}`)})
}
catch(err){
    console.log('Server error' + err.message)
    process.exit(1)


}
}
start()



*/
//npm run server




const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('PORT') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //  useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server error: ' + err.message);
    process.exit(1);
  }
}

start();

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
