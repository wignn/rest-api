import { prisma } from "../config/db.js";


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
        const {name, email} = req.body
        const user = await prisma.user.create({
            data: {
                name:name,
                email:email
            }
        })
        res.json(user)
    }catch(error){
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
}
