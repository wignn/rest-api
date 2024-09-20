import { route } from "../config/express.js";
import { getAllUsers, creatUser } from "../controller/route.js"; 
const userRoute = route;

userRoute.get('/users', getAllUsers);
userRoute.post('/create', creatUser);

export { userRoute };
