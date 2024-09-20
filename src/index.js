import express from 'express';
import 'colors';
import { port } from './config/route.js';
import {MainRoute, userRoute} from './routes/route.js';


const app = express();


app.use('/', MainRoute);
app.use('/', userRoute)

app.listen(port, () => {
    console.log(`server is running on port `.blue + ` http://localhost:${port}/ `.green);
});
