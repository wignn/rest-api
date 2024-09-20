import { prisma } from "../config/db.js";
import bcrypt from 'bcrypt'


export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
};

export const creatUser = async (req,res)=>{
    try {
        const {name, email, password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await prisma.user.create({
            data: {
                name:name,
                email:email,
                password: hashedPassword
            }
        })
        res.json(user)
    }catch(error){
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
}
