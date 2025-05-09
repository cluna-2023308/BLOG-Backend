import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Opinion System API",
            version: "1.0.0",
            description: "API para un sistema de gestión de opiniones",
            contact:{
                name: "Cristian Luna",
                email: "cluna-2023308@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3003/opinionSystem/v1"
            }
        ]
    },
    apis:[
        "./src/auth/.js",
        "./src/user/.js",
        "./src/category/.js",
        "./src/publication/.js",
        "./src/comment/.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi}