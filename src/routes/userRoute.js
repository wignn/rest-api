import { route } from "../config/express.js";
import { getAllUsers } from "../controller/route.js"; 
const userRoute = route;

userRoute.get('/users', getAllUsers);

export { userRoute };
