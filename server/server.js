const express = require('express');
const app = express();
const db = require('./models')
const cors = require('cors')
const env = require('./config/env')
const port = env.app.port;
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
app.use(express.json());
// Cargar el archivo YAML
const swaggerDocument = YAML.load('./openapi.yaml');

// Montar Swagger en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
  origin: "http://localhost:3001", // tu frontend
  credentials: true                // permite cookies
}));

app.use(cookieParser());
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