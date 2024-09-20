import { route } from "../config/express.js";
import { getAllUsers, creatUser, getUserById } from "../controller/route.js"; 
const userRoute = route;

userRoute.get('/data', getAllUsers);
userRoute.post('/create', creatUser);
userRoute.get('/:id', getUserById);

export { userRoute };
