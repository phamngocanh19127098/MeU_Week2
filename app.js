import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import dotenv from 'dotenv';
import userRoute from './routes/users.route.js'
import authRoute from './routes/auth.route.js'
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';


const app = express();
app.use(express.json())
app.use(morgan('dev'));
dotenv.config();
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);


// Swagger
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Test API",
        description: "User API Information",
        contact: {
          name: "Anh Pham"
        },
        servers: ["http://localhost:3000"]
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in : 'header'
          }
        }
      },
      security: [{
        bearerAuth: []
      }]
    },
    
    // ['.routes/*.js']
    apis: ["app.js"]
  };


  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));

  /**
 * @swagger
 * /api/users?page=2&size=5:
 *   get:  
 *     description: Get all users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         default: Bearer + your token
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: Get all users success
 *       403: 
 *         description: Invalid JWT
 * 
 */   



  /**
 * @swagger
 * /api/users/register:
 *   post:
 *
 *     description: Sign up account
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *            type : object
 *            properties:
 *              name:
 *                 type: string
 *                 default: Anh
 *              email:
 *                 type: string
 *                 default: npham4533@gmail.com
 *              password:
 *                 type: string
 *                 default: 123
 *     responses:
 *       200:
 *         description: Send mail success
 *       500:
 *         description:  Internal Server Error
 *    
 */  


  
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login to get access token
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *            type : object
 *            properties:
 *              email:
 *                 type: string
 *                 default: npham4533@gmail.com
 *              password:
 *                 type: string
 *                 default: 123    
 *     responses:
 *       200:
 *         description: Login success
 *       401:
 *         description: Email or password is incorrect
 */


  /**
 * @swagger
 * /api/users/verify/{user_id}:
 *   get:
 *     description: Verify your email
 *     parameters:
 *        - name: user_id
 *          in: path
 *          required: true
 *          schema:
 *            type : string
 *            format: uuid
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Invalid id
 */


  
const port = 3000;
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});
