import express from 'express';
import {connection} from './db/connection.js';
import userRoutes from './modules/users/user.routes.js';
import cors from 'cors'
// import taskRoutes from './modules/tasks/tasks.routes.js';
import bodyParser from 'body-parser';
import taskRoutes from './modules/tasks/tasks.routes.js';
import session from 'express-session';
// app.use(bodyParser.json())
const app = express();
const port = process.env.PORT || 3000
app.use(cors({origin: "*"}))
connection()
app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);
// // import { sessionMiddleware } from './modules/users/user.controller.js';//lastAdded
// app.use(sessionMiddleware)//lastAdded
app.get('/', (req, res) => res.send('hello world'))
app.listen(port, () => console.log(`app listen on port ${port}`))









