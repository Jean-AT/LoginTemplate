const express = require('express');
const app = express();
const db = require('./models')
const cors = require('cors')
const port = 3000;

app.use(express.json());
app.use(cors());
const usersRouter = require("./routers/Users")
app.use('/auth',usersRouter);

db.sequelize.authenticate()
    .then(() =>{
        console.log("Base de datos Conectada");
        app.listen(port,()=>{
            console.log(`Servidor corriendo en el puerto ${port}`);
        })
        return db.sequelize.sync({alter:true});
    })
    .catch((err)=>{
        console.log("Conexion a la base de datos fallo",err);
    })