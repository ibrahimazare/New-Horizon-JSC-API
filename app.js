const express = require("express");
const  authRouter = require('./src/route/auth.route')
const { AppDatasource} = require('./src/database/config.database')

const app = express();

const port = 3003;

// const employer = 'PenCom'

// const name = 'Ibrahim'
// app.use(express.json()) is a middleware that allow request been process 
app.use(express.json());



app.use('/api', authRouter)



AppDatasource.initialize()
    .then(async () => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });


